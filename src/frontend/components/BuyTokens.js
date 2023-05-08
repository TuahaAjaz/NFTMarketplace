import React, { useState } from 'react'
import { ethers } from "ethers"

function BuyTokens({ft, account}) {
  const [eth, setEth] = useState();  
  console.log(eth);
  return (
    <div>
      <h4>Buy TuahaImadAskari (TIA)</h4>
      <form
        onSubmit={async (event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();
          const val = ethers.utils.parseEther(eth.toString());
          console.log("Inside");
          let res = await ft.buyToken({value: val});
          console.log(res);
          alert(eth * 10, ' TJS transferred successfully');  
        }}
      >
        <div className="form-group">
        <div className="row">
          <div className="col-12">
            <p>
              10 TIA for 1 ETH
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