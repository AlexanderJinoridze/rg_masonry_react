import React, { ReactElement, useMemo } from "react";
interface blockElement {
    blockType: string;
    items: ReactElement[];
}

export default function Block({ blockType, items }: blockElement) {
    return (
        <div className={blockType}>
            {items.map((item) => {
                return (
                    <div key={item.props.id} className="item">
                        {item}
                    </div>
                );
            })}
        </div>
    );
}
