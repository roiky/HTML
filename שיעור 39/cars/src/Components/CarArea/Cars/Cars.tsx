import axios from "axios";
import "./Cars.css";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

const URL = "http://localhost:2200";
console.log(debounce);
export function Cars(): JSX.Element {
  const [isCarsLoading, setIsCarsLoading] = useState<boolean>(false);
  const [cars, setCars] = useState([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLatestResult, setIsLatestResult] = useState(false);

  // lifecycle
  // mounted

  useEffect(() => {
    getCars();
    return () => {
      console.log("canceling set state for", searchInput);
      setIsLatestResult(false);
    };
  }, [searchInput]);

  async function getCars() {
    try {
      setIsLatestResult(true);
      setIsCarsLoading(true);
      const result = await axios.get(`${URL}/cars?search=${searchInput}`);
      if (isLatestResult) {
        console.log("set state is working");
        setCars(result?.data?.data);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsCarsLoading(false);
    }
  }
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchInput(value);
      }, 500), // 500ms delay
    []
  );
  const handleChange = (event: any) => {
    debouncedSetSearch(event.target.value);
  };
  return (
    <div className="Cars">
      <h1>Cars</h1>
      <div>
        <input type="text" onChange={handleChange} placeholder="Search..." />
        {/* <input type="text" onChange={handleChange} /> */}
      </div>
      <div>
        {isCarsLoading ? (
          <h2>Loading...</h2>
        ) : (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {cars?.map((c: { name: string; price: string; type: string }) => {
              return (
                <div style={{ border: "1px solid black" }}>
                  <h2>{c.name}</h2>
                  <h2>{c.price}</h2>
                  <h2>{c.type}</h2>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
