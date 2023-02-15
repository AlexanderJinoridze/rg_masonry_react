import { useEffect, useState } from "react";
import { dummyData } from "./types";

function Control({ columns, setColumns, setData }) {
    const [dataLength, setDataLength] = useState<number>(80);

    const generateDummyData = (length: number): dummyData[] => {
        return Array(length)
            .fill("")
            .map((_, i) => {
                return { id: i, title: `#${i + 1}` };
            });
    };

    const handleColumnChange = (e: any) =>
        setColumns(parseInt(e?.target?.value));

    const handkeItemChange = (e: any) => {
        let newDataLength = parseInt(e?.target?.value);

        setDataLength(newDataLength);
        setData(generateDummyData(newDataLength));
    };

    useEffect(() => {
        setData(generateDummyData(dataLength));
    }, []);

    return (
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
                    onChange={handkeItemChange}
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
    );
}

export default Control;
