/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import UseWeb3 from './useWeb3'
import { useActiveWeb3React } from 'hooks'
import { useVDPMasterContract } from './useContract'

export const useMint = () => {
  // use web3 for wei utils
  const web3 = UseWeb3()
  const contract = useVDPMasterContract()
  const { account: myAccount } = useActiveWeb3React()
  // loading state for en/dis-able button
  const [loading, setLoading] = useState(false)
  
  const deposit = useCallback(
    async (amount: string, callback?: any) => {
      const masterContract = await contract
      
      if (!masterContract || !myAccount) throw new Error(`Contract loading failed or Can't find account`)
      if (!web3) throw new Error(`Connecting web3 is required`)
      // option format for send transaction
      setLoading(true)
      const amountInWei = await web3.utils.toWei(amount);
      let confirmed = false
      let errored = false
      const options = {
        from: myAccount,
      }

      // Send a transaction to blockchain
      try {
        masterContract
          .stake(amountInWei)
          .send(options)
          .on('confirmation', (confirmationNumber: any, receipt: any) => {
            console.log('confirmationNumber', confirmationNumber)
            console.log(receipt)
            if (!confirmed) {
              if (callback) {
                // not confirm input value set default to '0'
                setLoading(false)
                callback()
              }
              confirmed = true
            }
            setLoading(false)
          })
          .on('error', (error: any) => {
            if (!errored) {
              errored = true
              throw error
            }
          })
      }catch (err) {
        setLoading(false)
        // console.error(err)
        throw(err)
      }
  },[web3, contract, myAccount],
  )

  return {
    deposit,
    loading
  }
} 