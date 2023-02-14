console.log("RGGRID!!!!");

type block = "square" | "horizontals" | "vertical" | "double";
type halfWidthBlock = "vertical" | "double";
type twoItemBlock = "horizontals" | "double";

const getRandomNumber = (from = 0, to = 1) => {
    return Math.floor(Math.random() * (to - from)) + from;
};

const getRandomElementOf = (array: any[]) => {
    return array[getRandomNumber(0, array.length)];
};

const getIndexesOf = (value: any, array: any[]) => {
    return array
        .map((elem: any, index: number) => elem === value && index)
        .filter((elem: any) => elem !== false);
};

const eitherOr = (firstStatement: any, secondStatement: any) => {
    return Math.random() < 0.5 ? firstStatement : secondStatement;
};

const isFullWidthBlock = (blockType: block) => {
    return ["square", "horizontals"].includes(blockType);
};

const isHalfWidthBlock = (blockType: block) => {
    return ["vertical", "double"].includes(blockType);
};

const isOneItemBlock = (blockType: block) => {
    return ["square", "vertical"].includes(blockType);
};

const isTwoItemBlock = (blockType: block) => {
    return ["horizontals", "double"].includes(blockType);
};

const evaluateSpaceTaken = (line: block[]) => {
    return line.reduce((accumulator: number, blockType: any) => {
        if (isFullWidthBlock(blockType)) {
            return (accumulator = accumulator + 2);
        } else {
            return (accumulator = accumulator + 1);
        }
    }, 0);
};

function joinVertically(
    dividedBlockType: twoItemBlock,
    randomLine: block[],
    randomBlockEntries: number[]
) {
    if (randomBlockEntries.length <= 0) {
        return false;
    }

    let indexOfPickedBlock = getRandomElementOf(randomBlockEntries);

    randomLine.splice(
        indexOfPickedBlock,
        1,
        dividedBlockType === "horizontals" ? "square" : "vertical"
    );

    return [randomLine, 1];
}

function joinHorizontally(
    halfWidthBlockType: halfWidthBlock,
    randomLine: block[],
    randomBlockEntries: number[]
) {
    if (randomBlockEntries.length <= 1) {
        return false;
    }

    let replacementBlock: block;
    let spaceTaken;
    let firstPick = getRandomElementOf(randomBlockEntries);
    randomBlockEntries.splice(randomBlockEntries.indexOf(firstPick), 1);
    let secondPick = getRandomElementOf(randomBlockEntries);

    if (halfWidthBlockType === "vertical") {
        replacementBlock = "square";
        spaceTaken = 1;
    } else if (halfWidthBlockType === "double") {
        replacementBlock = "horizontals";
        spaceTaken = 2;
    }

    randomLine[firstPick] = replacementBlock!;
    randomLine.splice(secondPick, 1);

    return [randomLine, spaceTaken];
}

function stretchBlocksFullWidth(columns: number, line: block[]) {
    let spaceTaken = evaluateSpaceTaken(line);

    if (columns > spaceTaken) {
        let spaceToBeFilled = columns - spaceTaken;

        while (spaceToBeFilled > 0) {
            let randomBlock = getRandomElementOf(["double", "vertical"]);
            let randomBlockEntries = getIndexesOf(randomBlock, line);

            if (randomBlockEntries.length === 0) {
                continue;
            }

            let indexOfChangeBlock = getRandomElementOf(randomBlockEntries);
            let replacementBlock: block;

            if (line[indexOfChangeBlock] === "vertical") {
                replacementBlock = "square";
            } else if (line[indexOfChangeBlock] === "double") {
                replacementBlock = "horizontals";
            }

            line.splice(indexOfChangeBlock, 1, replacementBlock!);

            spaceToBeFilled = spaceToBeFilled - 1;
        }
    }
}

function eliminateLeftover(leftover: number, lines: block[][]) {
    while (leftover > 0) {
        let randomLineIndex = getRandomNumber(0, lines.length);
        let randomLine = [...lines[randomLineIndex]];
        let randomBlock = getRandomElementOf([
            "horizontals",
            "double",
            "vertical",
        ]);
        let randomBlockEntries = getIndexesOf(randomBlock, randomLine);
        let joinMethod;

        if (randomBlock === "horizontals") {
            joinMethod = joinVertically;
        } else if (randomBlock === "vertical") {
            joinMethod = joinHorizontally;
        } else if (randomBlock === "double") {
            joinMethod =
                leftover > 1
                    ? eitherOr(joinVertically, joinHorizontally)
                    : joinVertically;
        }

        let joinMethodOutput = joinMethod(
            randomBlock,
            randomLine,
            randomBlockEntries
        );

        if (joinMethodOutput !== false) {
            let [newLine, leftoverToDelete] = joinMethodOutput;

            lines[randomLineIndex] = newLine;
            leftover = leftover - leftoverToDelete;
        }
    }
}

export default function generateGridMap(columns: number, totalItems: number) {
    const blockTypes = ["square", "horizontals", "vertical", "double"];
    const resultMap = [];

    let itemsAbleToSet = 0;
    let itemsLeft = totalItems;

    let lines = [];

    while (itemsLeft > 0) {
        let freeSpaceOfLine = columns;
        let line = [];

        while (freeSpaceOfLine > 0) {
            let selectedBlockType = getRandomElementOf(blockTypes);
            let spaceTaken = 0;
            let itemsAffected = 0;

            if (totalItems <= columns && itemsAbleToSet >= totalItems) {
                break;
            }

            if (itemsLeft < 2) {
                selectedBlockType = "vertical";
            }

            if (selectedBlockType === "square" && itemsLeft <= columns) {
                selectedBlockType = "horizontals";
            }

            if (freeSpaceOfLine < 2) {
                selectedBlockType =
                    selectedBlockType === "square" ? "vertical" : "double";
            }

            if (isTwoItemBlock(selectedBlockType)) {
                itemsAffected = 2;
            } else if (isOneItemBlock(selectedBlockType)) {
                itemsAffected = 1;
            }

            if (isFullWidthBlock(selectedBlockType)) {
                spaceTaken = 2;
            } else if (isHalfWidthBlock(selectedBlockType)) {
                spaceTaken = 1;
            }

            itemsAbleToSet = itemsAbleToSet + itemsAffected;

            line.push(selectedBlockType);

            freeSpaceOfLine = freeSpaceOfLine - spaceTaken;
            itemsLeft = itemsLeft - itemsAffected;
        }

        lines.push(line);
    }

    let leftover = itemsAbleToSet - totalItems;

    eliminateLeftover(leftover, lines);

    if (totalItems === columns) {
        stretchBlocksFullWidth(columns, lines[0]);
    }

    for (let i = 0; i < lines.length; i++) {
        resultMap.push(...lines[i]);
    }

    return resultMap;
}
