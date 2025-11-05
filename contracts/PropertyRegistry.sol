// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PropertyRegistry
 * @dev Registro descentralizado de propiedades inmobiliarias en blockchain
 */
contract PropertyRegistry {
    
    struct Property {
        uint256 id;
        string location;
        address owner;
        uint256 priceWei;
        uint256 registeredAt;
        bool isActive;
        string ipfsHashMetadata;
    }

    struct PropertyHistory {
        address previousOwner;
        uint256 salePrice;
        uint256 saleDate;
        string transactionReference;
    }

    // Mapeos principales
    mapping(uint256 => Property) public properties;
    mapping(uint256 => PropertyHistory[]) public propertyHistory;
    mapping(address => uint256[]) public ownerProperties;
    mapping(uint256 => uint256) public propertyCounter;

    // Eventos
    event PropertyRegistered(
        indexed uint256 propertyId,
        address indexed owner,
        string location,
        uint256 price
    );

    event PropertyTransferred(
        indexed uint256 propertyId,
        address indexed from,
        address indexed to,
        uint256 price,
        uint256 timestamp
    );

    event PropertyUpdated(
        indexed uint256 propertyId,
        string newLocation,
        uint256 newPrice
    );

    // Funciones de registro
    function registerProperty(
        string memory _location,
        uint256 _priceWei,
        string memory _ipfsHash
    ) public returns (uint256) {
        uint256 propertyId = propertyCounter[1]++;
        
        properties[propertyId] = Property({
            id: propertyId,
            location: _location,
            owner: msg.sender,
            priceWei: _priceWei,
            registeredAt: block.timestamp,
            isActive: true,
            ipfsHashMetadata: _ipfsHash
        });

        ownerProperties[msg.sender].push(propertyId);

        emit PropertyRegistered(propertyId, msg.sender, _location, _priceWei);
        return propertyId;
    }

    // Transferencia de propiedad
    function transferProperty(
        uint256 _propertyId,
        address _newOwner,
        uint256 _salePrice,
        string memory _txReference
    ) public payable {
        Property storage prop = properties[_propertyId];
        require(prop.isActive, "Property is not active");
        require(prop.owner == msg.sender, "Only owner can transfer");
        require(msg.value >= _salePrice, "Insufficient payment");

        // Registrar en historial
        propertyHistory[_propertyId].push(PropertyHistory({
            previousOwner: msg.sender,
            salePrice: _salePrice,
            saleDate: block.timestamp,
            transactionReference: _txReference
        }));

        // Transferir propiedad
        prop.owner = _newOwner;
        
        // Actualizar mapeo de propietarios
        ownerProperties[_newOwner].push(_propertyId);

        // Transferir fondos al vendedor
        (bool success, ) = msg.sender.call{value: msg.value}("");
        require(success, "Payment transfer failed");

        emit PropertyTransferred(_propertyId, msg.sender, _newOwner, _salePrice, block.timestamp);
    }

    // Actualizar propiedades
    function updateProperty(
        uint256 _propertyId,
        string memory _newLocation,
        uint256 _newPrice
    ) public {
        Property storage prop = properties[_propertyId];
        require(prop.owner == msg.sender, "Only owner can update");

        prop.location = _newLocation;
        prop.priceWei = _newPrice;

        emit PropertyUpdated(_propertyId, _newLocation, _newPrice);
    }

    // Getter functions
    function getProperty(uint256 _propertyId) public view returns (Property memory) {
        return properties[_propertyId];
    }

    function getPropertyHistory(uint256 _propertyId) public view returns (PropertyHistory[] memory) {
        return propertyHistory[_propertyId];
    }

    function getOwnerProperties(address _owner) public view returns (uint256[] memory) {
        return ownerProperties[_owner];
    }

    function getPropertyCount() public view returns (uint256) {
        return propertyCounter[1];
    }
}
