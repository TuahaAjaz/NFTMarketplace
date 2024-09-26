import React, { useState } from 'react'
import { ethers } from "ethers"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BuyTokens({ft, account}) {
  const [eth, setEth] = useState();  
  console.log(eth);
  return (
    <div>
      <h4>Buy Fastoids (FAS)</h4>
      <form
        onSubmit={async (event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          try {
            event.preventDefault();
            const val = ethers.utils.parseEther(eth.toString());
            console.log("Inside");
            let res = await ft.buyToken({value: val});
            console.log(res);
            toast(eth * 10, ' FAS transferred successfully');  
          } catch (err) {
            console.log(err);
            toast("Some network error occured");
          }
        }}
      >
        <div className="form-group">
        <div className="row">
          <div className="col-12">
            <p>
              10 FAS for 1 ETH
            </p>
          </div>
        </div>  
          <label>Amount (In ETH)</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            value={eth}
            onChange={(e) => {setEth(e.target.value)}}
            required
          />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  )
}

export default BuyTokens