// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RentalAgreement
 * @dev Contratos de alquiler inteligentes con pagos automáticos
 */
contract RentalAgreement {

    struct Rental {
        uint256 id;
        uint256 propertyId;
        address landlord;
        address tenant;
        uint256 monthlyRentWei;
        uint256 securityDepositWei;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        uint256 nextPaymentDue;
    }

    struct Payment {
        uint256 rentalId;
        uint256 amount;
        uint256 paymentDate;
        string transactionHash;
        bool confirmed;
    }

    // Mapeos
    mapping(uint256 => Rental) public rentals;
    mapping(uint256 => Payment[]) public rentalPayments;
    mapping(uint256 => uint256) public rentalCounter;

    // Eventos
    event RentalCreated(
        indexed uint256 rentalId,
        uint256 propertyId,
        address indexed landlord,
        address indexed tenant,
        uint256 monthlyRent,
        uint256 duration
    );

    event RentPaid(
        indexed uint256 rentalId,
        address indexed tenant,
        uint256 amount,
        uint256 paymentDate
    );

    event RentalEnded(
        indexed uint256 rentalId,
        uint256 endDate
    );

    // Crear contrato de alquiler
    function createRental(
        uint256 _propertyId,
        address _tenant,
        uint256 _monthlyRentWei,
        uint256 _securityDepositWei,
        uint256 _durationMonths
    ) public payable returns (uint256) {
        require(msg.value >= (_monthlyRentWei + _securityDepositWei), "Insufficient deposit");

        uint256 rentalId = rentalCounter[1]++;
        uint256 endDate = block.timestamp + (_durationMonths * 30 days);

        rentals[rentalId] = Rental({
            id: rentalId,
            propertyId: _propertyId,
            landlord: msg.sender,
            tenant: _tenant,
            monthlyRentWei: _monthlyRentWei,
            securityDepositWei: _securityDepositWei,
            startDate: block.timestamp,
            endDate: endDate,
            isActive: true,
            nextPaymentDue: block.timestamp + 30 days
        });

        emit RentalCreated(
            rentalId,
            _propertyId,
            msg.sender,
            _tenant,
            _monthlyRentWei,
            _durationMonths
        );

        return rentalId;
    }

    // Pagar renta
    function payRent(
        uint256 _rentalId,
        string memory _txHash
    ) public payable {
        Rental storage rental = rentals[_rentalId];
        require(rental.isActive, "Rental is not active");
        require(msg.sender == rental.tenant, "Only tenant can pay rent");
        require(msg.value >= rental.monthlyRentWei, "Insufficient payment");

        // Registrar pago
        rentalPayments[_rentalId].push(Payment({
            rentalId: _rentalId,
            amount: msg.value,
            paymentDate: block.timestamp,
            transactionHash: _txHash,
            confirmed: true
        }));

        // Actualizar próxima fecha de pago
        rental.nextPaymentDue = block.timestamp + 30 days;

        // Transferir fondos al propietario
        (bool success, ) = rental.landlord.call{value: rental.monthlyRentWei}("");
        require(success, "Payment transfer failed");

        // Devolver cambio si hay
        if (msg.value > rental.monthlyRentWei) {
            (bool refundSuccess, ) = msg.sender.call{value: msg.value - rental.monthlyRentWei}("");
            require(refundSuccess, "Refund failed");
        }

        emit RentPaid(_rentalId, msg.sender, msg.value, block.timestamp);
    }

    // Terminar arrendamiento
    function endRental(uint256 _rentalId) public {
        Rental storage rental = rentals[_rentalId];
        require(msg.sender == rental.landlord || msg.sender == rental.tenant, "Not authorized");
        require(rental.isActive, "Rental already ended");

        rental.isActive = false;

        // Devolver depósito de seguridad
        (bool success, ) = rental.tenant.call{value: rental.securityDepositWei}("");
        require(success, "Refund failed");

        emit RentalEnded(_rentalId, block.timestamp);
    }

    // Getters
    function getRental(uint256 _rentalId) public view returns (Rental memory) {
        return rentals[_rentalId];
    }

    function getRentalPayments(uint256 _rentalId) public view returns (Payment[] memory) {
        return rentalPayments[_rentalId];
    }

    function isRentOverdue(uint256 _rentalId) public view returns (bool) {
        Rental memory rental = rentals[_rentalId];
        return rental.isActive && block.timestamp > rental.nextPaymentDue;
    }
}
