import { ReactElement, useEffect, useState } from "react";
import Control from "./Control";
import Header from "./Header";
import RGMasonry from "./rg_masonry";
import { dummyData } from "./types";

function CustomItem({ id, title }: any): ReactElement {
    return <div id={id}>{title}</div>;
}

function App() {
    const [data, setData] = useState<dummyData[]>([]);
    const [columns, setColumns] = useState<number>(5);

    return (
        <>
            <Header />
            <Control {...{ columns, setColumns, setData }} />
            <RGMasonry columns={columns}>
                {data.map((dataItem: object, i) => {
                    return <CustomItem key={i} {...dataItem} />;
                })}
            </RGMasonry>
        </>
    );
}

export default App;
