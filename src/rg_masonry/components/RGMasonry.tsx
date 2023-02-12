import React, { ReactElement, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Block from "./Block";
import generateGridMap from "../gridMapGenerate";

interface RGMasonryProps {
    columns: number;
    children: ReactElement[];
}

export default function RGMasonry({ columns, children }: RGMasonryProps): any {
    const [gridMap, setGridMap] = useState<string[]>([]);
    const [blocks, setBlocks] = useState<ReactElement[]>();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setGridMap(generateGridMap(columns, children.length));
        setWidth(columns * 150);
    }, [columns, children.length]);

    useEffect(() => {
        let currentItemId = 0;
        let blockSet = gridMap.map((blockType) => {
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
                <Block key={uuid()} blockType={blockType} items={itemSubset} />
            );
        });

        setBlocks(blockSet);
    }, [gridMap]);

    return (
        <div id="app" style={{ width }}>
            {blocks}
        </div>
    );
}
