import { ReactElement, useEffect, useState } from "react";
import RGMasonry from "./rg_masonry";

interface dummyData {
    id: number;
    title: string;
}

function CustomItem({ id, title }: any): ReactElement {
    return <div id={id}>{title}</div>;
}

function App() {
    const [data, setData] = useState<dummyData[]>([]);
    const [columns, setColumns] = useState<number>(5);
    const [dataLength, setDataLength] = useState<number>(80);

    const generateDummyData = (length: number): dummyData[] => {
        return Array(length)
            .fill("")
            .map((_, i) => {
                return { id: i, title: `#${i + 1}` };
            });
    };

    useEffect(() => {
        setData(generateDummyData(dataLength));
    }, []);

    return (
        <>
            <h1>RG Masonry</h1>
            <div className="control">
                <div className="fieldset">
                    <label className="field-label" htmlFor="columns">
                        Columns count
                    </label>
                    <input
                        type="number"
                        id="columns"
                        className="input"
                        min={1}
                        value={columns}
                        onChange={(e) => setColumns(parseInt(e?.target?.value))}
                    />
                </div>
                <div className="fieldset">
                    <label className="field-label" htmlFor="data-length">
                        Items quantity
                    </label>
                    <input
                        type="number"
                        id="data-length"
                        className="input"
                        min={1}
                        value={dataLength}
                        onChange={(e) => {
                            let newDataLength = parseInt(e?.target?.value);

                            setDataLength(newDataLength);
                            setData(generateDummyData(newDataLength));
                        }}
                    />
                </div>
                <div className="fieldset">
                    <span className="field-label">Number of columns</span>
                    <div className="btnset">
                        <button className="btn" onClick={() => setColumns(5)}>
                            5
                        </button>
                        <button className="btn" onClick={() => setColumns(4)}>
                            4
                        </button>
                        <button className="btn" onClick={() => setColumns(3)}>
                            3
                        </button>
                        <button className="btn" onClick={() => setColumns(2)}>
                            2
                        </button>
                        <button className="btn" onClick={() => setColumns(1)}>
                            1
                        </button>
                    </div>
                </div>
            </div>
            <RGMasonry columns={columns}>
                {data.map((dataItem: object, i) => {
                    return <CustomItem key={i} {...dataItem} />;
                })}
            </RGMasonry>
        </>
    );
}

export default App;
