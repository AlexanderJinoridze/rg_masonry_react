import React, { ReactElement, useMemo } from "react";

interface blockElement {
    blockType: string;
    items: ReactElement[];
}

export default function Block({ blockType, items }: blockElement) {
    const blocks = useMemo(() => {
        return items.map((item) => {
            return (
                <div key={item.props.id} className="item">
                    {item}
                </div>
            );
        });
    }, [items]);

    return <div className={blockType}>{blocks}</div>;
}
