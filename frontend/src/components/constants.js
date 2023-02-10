const contractAddress = '0x3b2462c7f04c54288887dfe6e2154278dd476a04'
//"0x90cA98725C5712e7b98961076d5076aE06C6E899";
const abi = [
  
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [
        { internalType: 'string', name: 'uid', type: 'string' },
        { internalType: 'string', name: 'issuedTo', type: 'string' },
        { internalType: 'string', name: 'issuer', type: 'string' },
        { internalType: 'string', name: 'course', type: 'string' },
        { internalType: 'string', name: 'issuedOn', type: 'string' },
      ],
      name: 'addCertificate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string[]', name: 'uid', type: 'string[]' },
        { internalType: 'string[]', name: 'issuedTo', type: 'string[]' },
        { internalType: 'string[]', name: 'issuer', type: 'string[]' },
        { internalType: 'string[]', name: 'course', type: 'string[]' },
        { internalType: 'string[]', name: 'issuedOn', type: 'string[]' },
      ],
      name: 'addCertificateForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string', name: 'uid', type: 'string' },
        { internalType: 'string', name: 'issuedTo', type: 'string' },
        { internalType: 'string', name: 'issuer', type: 'string' },
        { internalType: 'string', name: 'course', type: 'string' },
        { internalType: 'string', name: 'issuedOn', type: 'string' },
      ],
      name: 'verifyCertificate',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
  
]

export { contractAddress, abi }
