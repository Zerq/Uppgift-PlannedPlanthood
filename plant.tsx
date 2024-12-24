import { ReactElement } from "react";

export function ToElm(reactElm: ReactElement){
    return (reactElm as unknown) as HTMLElement;
}

export class Plant {

    //i prefer using the Array<Plant> sytntax but it meshes badly with TSX
    public static ParseList(txt:string): Plant[] {
      const items = txt.split(/\n\s*\n/);

 

       return items.map(n=> {  //split double linebreaks
          return Plant.parse(...n.split("\n"))  //split single line breaks on the remainder
        });
    }

    private static parse(...data:string[]):Plant {
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
        plant.tags = data.map(n=> n.trim());
        return plant;
     } 

    public date:Date;
    public username:string;
    public description:string;
    public title:string;
    public tags:string[];
}

export function PlantTemplate(plant: Plant){
  return <article>
      <header>
        <img src={`./assets/images/${plant.title}.png `}alt="" />
        <ul>

        {plant.tags.map(function(tag:string){ 
         return <li data-color="">{tag}</li>;
         })}


        </ul>
      </header>
      <h3>{plant.title}</h3>
      <p>
      {plant.description}
      </p>
      <footer>
        <img src={`./assets/images/${plant.username}.png`} alt="" />
        <p className="name">{plant.username}</p>
        <p className="date">{plant.date.toDateString()}</p>
      </footer>
    </article>;
}
