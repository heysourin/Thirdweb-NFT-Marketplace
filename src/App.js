import {
  ConnectWallet,
  MediaRenderer,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { BigNumber } from "ethers";

export default function Home() {
  const { contract } = useContract(
    "0xA8059d9F9aF67C49E7e15DA4e9F2F99cAE3C70f9",
    "marketplace"
  );

  const { data: nfts, isLoading } = useActiveListings(contract);

  return (
    <div className="container">
      <main className="main">
        <h1>Mumbai Marketplace</h1>
        <ConnectWallet />
        {!isLoading ? (
          <div>
            {nfts &&
              nfts.map((nft) => {
                return (
                  <div>
                    <MediaRenderer
                      src={nft.asset.image}
                      height="200px"
                      width="200px"
                    />
                    <p>{nft.asset.name}</p>
                    <p>
                      Price: {nft.buyoutCurrencyValuePerToken.displayValue}{" "}
                      MATIC
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          await contract?.buyoutListing(
                            BigNumber.from(nft.id),
                            1
                          );
                        } catch (e) {
                          console.log(e);
                          alert(e);
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>{" "}
    </div>
  );
}
