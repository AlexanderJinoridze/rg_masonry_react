import React, { ReactElement, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface blockElement {
    blockType: string;
    items: ReactElement[];
}

export default function Block({ blockType, items }: blockElement) {
    const [content, setContent] = useState<any | null>(null);

    useEffect(() => {
        let newContent = items.map((item) => {
            return (
                <div key={uuid()} className="item">
                    {item}
                </div>
            );
        });

        setContent(newContent);
    }, [items]);

    return <div className={blockType}>{content}</div>;
}
