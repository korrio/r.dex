import random from 'lodash/random'

// Array of available nodes to connect to
const nodes = ['https://rpc.bitkubchain.io', 'https://rpc.bitkubchain.io', 'https://rpc.bitkubchain.io']

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl