const contractAddress = "0x722C63a9ea2bF333908140EE03Afa10b19CD52bC"
//"0x90cA98725C5712e7b98961076d5076aE06C6E899";
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "uid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "issuedTo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "issuer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "issuedOn",
        "type": "string"
      }
    ],
    "name": "addCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "uid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "issuedTo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "issuer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "issuedOn",
        "type": "string"
      }
    ],
    "name": "verifyCertificate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export{contractAddress,abi};