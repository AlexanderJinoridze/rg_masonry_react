import React, { ReactElement, useEffect, useMemo, useState } from "react";

import Block from "./Block";
import generateGridMap from "../gridMapGenerator";

interface RGMasonryProps {
    columns: number;
    children: ReactElement[];
}

export default function RGMasonry({ columns, children }: RGMasonryProps): any {
    const blocks = () => {
        let currentItemId = 0;

        return generateGridMap(columns, children.length).map((blockType) => {
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
    };

    return (
        <div id="app" style={{ width: columns * 150 }}>
            {blocks()}
        </div>
    );
}
