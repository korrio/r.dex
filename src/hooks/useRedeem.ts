import { useCallback, useState } from 'react'
import UseWeb3 from './useWeb3'
import { useActiveWeb3React } from 'hooks'
import { useVDPMasterContract } from './useContract'

export const useRedeem = () => {
  const web3 = UseWeb3()
  const contract = useVDPMasterContract()
  const { account: myAccount } = useActiveWeb3React()
  const [loadingStatus, setLoading] = useState(false)
  
  const withdraw = useCallback(
    async (amount: string, callback?: any) => {
      const masterContract = await contract
      
      if (!masterContract || !myAccount) throw new Error(`Contract loading failed or Can't find account`)
      if (!web3) throw new Error(`Connecting web3 is required`)
      setLoading(true)
      const amountInWei = await web3.utils.toWei(amount);
      let confirmed = false
      let errored = false
      const options = { from: myAccount }

      // Send a transaction to blockchain
      try {
        masterContract
          .claimBUSD(amountInWei)
          .send(options)
          .on('confirmation', (confirmationNumber: any, receipt: any) => {
            console.log('confirmationNumber', confirmationNumber)
            console.log(receipt)
            setLoading(false)
            if (!confirmed) {
              if (callback) {
                setLoading(false)
                callback()
              }
              confirmed = true
            }
            setLoading(false)
          })
          .on('error', (error: any) => {
            setLoading(false)
            if (!errored) {
              errored = true
              throw error
            }
          })
      } catch (err) {
        setLoading(false)
        // console.error(err)
        throw (err)
      }
    },
    [contract, myAccount, web3],
  )

  return {
    withdraw,
    loadingStatus
  }
}