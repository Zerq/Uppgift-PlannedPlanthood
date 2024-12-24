import { jsx as _jsx, jsxs as _jsxs } from "./react/jsx-runtime.js";
export function ToElm(reactElm) {
    return reactElm;
}
export class Plant {
    //i prefer using the Array<Plant> sytntax but it meshes badly with TSX
    static ParseList(txt) {
        const items = txt.split(/\n\s*\n/);
        return items.map(n => {
            return Plant.parse(...n.split("\n")); //split single line breaks on the remainder
        });
    }
    static parse(...data) {
        /*
   Blommor   <-- tag
   Ätbart <-- tag
   Grönska <-- tag
   Gurka <-- title
   Gurka växer snabbt, är enkel att odla och ger mängder med gurkor, bara man är noga med vattning, omplantering, duschning och gödsling. <-- description
   Coolio <-- username
   2024-04-01 <-- date  start reading from here...
        */
        let plant = new Plant();
        plant.date = new Date(data.pop().trim());
        plant.username = data.pop().trim();
        plant.description = data.pop().trim();
        plant.title = data.pop().trim();
        plant.tags = data.map(n => n.trim());
        return plant;
    }
    date;
    username;
    description;
    title;
    tags;
}
export function PlantTemplate(plant) {
    return _jsxs("article", { children: [_jsxs("header", { children: [_jsx("img", { src: `./assets/images/${plant.title}.png `, alt: "" }), _jsx("ul", { children: plant.tags.map(function (tag) {
                            return _jsx("li", { "data-color": "", children: tag });
                        }) })] }), _jsx("h3", { children: plant.title }), _jsx("p", { children: plant.description }), _jsxs("footer", { children: [_jsx("img", { src: `./assets/images/${plant.username}.png`, alt: "" }), _jsx("p", { class: "name", children: plant.username }), _jsx("p", { class: "date", children: plant.date.toDateString() })] })] });
}
//# sourceMappingURL=plant.js.map