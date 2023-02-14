import React, { ReactElement } from "react";

interface blockElement {
    blockType: string;
    items: ReactElement[];
}

export default function Block({ blockType, items }: blockElement) {
    const content = () => {
        return items.map((item) => {
            return (
                <div key={item.props.id} className="item">
                    {item}
                </div>
            );
        });
    };

    return <div className={blockType}>{content()}</div>;
}
