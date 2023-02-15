import React, { ReactElement, useEffect, useMemo, useState } from "react";

import Block from "./Block";
import generateGridMap from "../gridMapGenerate";

interface RGMasonryProps {
    columns: number;
    children: ReactElement[];
}

export default function RGMasonry({ columns, children }: RGMasonryProps): any {
    console.log("RGMASONRY RERENDER");
    const [gridMap, setGridMap] = useState<string[]>([]);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setGridMap(generateGridMap(columns, children.length));
        setWidth(columns * 150);
    }, [columns, children.length]);

    const blocks = useMemo(() => {
        let currentItemId = 0;

        return gridMap.map((blockType) => {
            let increment = 0;

            if (["square", "vertical"].includes(blockType)) {
                increment = 1;
            } else if (["horizontals", "double"].includes(blockType)) {
                increment = 2;
            }

            let nextItemId = currentItemId + increment;
            let itemSubset = children.slice(currentItemId, nextItemId);

            currentItemId = nextItemId;

            return (
                <Block
                    key={nextItemId}
                    blockType={blockType}
                    items={itemSubset}
                />
            );
        });
    }, [gridMap]);

    return (
        <div id="app" style={{ width }}>
            {blocks}
        </div>
    );
}
