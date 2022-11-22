import React from "react";

const CoinRow = ({ coin, index }) => {
  return (
    <tr className="items-center mt-10 border-color border-b-1 pb-10">
      <td scope="col" className="py-3 px-6">{index}</td>
        <td>
        <img
          className="rounded-full h-10 w-10"
          src={coin.image}
          alt={coin.symbol}
        />
        </td>
      <td >
        {/* <img
          src={coin.image}
          alt=""
        //   className="img-fluid me-4"
          style={{ width: "10%" }}
        /> */}
        <span>{coin.name}</span>
        <span className="ms-3 text-muted">{coin.symbol}</span>
      </td>

      <td>${coin.current_price.toLocaleString()}</td>

      <td
        className={
          coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-600"
        }
      >
        {coin.price_change_percentage_24h}
      </td>

      <td>
        ${coin.total_volume.toLocaleString()}
      </td>
    </tr>
  );
};

export default CoinRow;