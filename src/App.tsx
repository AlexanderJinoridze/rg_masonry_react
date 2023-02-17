import { ReactElement, useEffect, useMemo, useState } from "react";
import Header from "./Header";
import RGMasonry from "./rg_masonry";
import { dummyData } from "./types";
import useEvent from "./hooks/useEvent";

function CustomItem({ id, title }: any): ReactElement {
    return <div id={id}>{title}</div>;
}

const generateDummyData = (length: number): dummyData[] => {
    return Array(length)
        .fill("")
        .map((_, i) => {
            return { id: i, title: `#${i + 1}` };
        });
};

function App() {
    console.log("APP");
    // const [data, setData] = useState<dummyData[]>(
    //     generateDummyData(defaultDataLength)
    // );
    const [columns, setColumns] = useState<number>(5);
    const [dataLength, setDataLength] = useState<number>(10000);

    const handleColumnChange = useEvent((e: any) => {
        setColumns(parseInt(e?.target?.value));
    });

    const handleItemChange = useEvent((e: any) => {
        setDataLength(parseInt(e?.target?.value));
        // let newDataLength = parseInt(e?.target?.value);
        //setData(generateDummyData(newDataLength));
    });

    // useEffect(() => {
    //     setData(generateDummyData(dataLength));
    // }, []);

    const datas = () => {
        return generateDummyData(dataLength).map((dataItem: object, i) => {
            return <CustomItem key={i} {...dataItem} />;
        });
    };

    return (
        <>
            <Header />
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
                        onChange={handleColumnChange}
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
                        onChange={handleItemChange}
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
            <RGMasonry columns={columns}>{datas()}</RGMasonry>
        </>
    );
}

export default App;
