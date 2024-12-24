import { Plant, PlantTemplate, ToElm } from "./plant.js";

export function run(){

    const data = Plant.ParseList(`Blommor
        Ätbart
        Grönska
        Gurka
        Gurka växer snabbt, är enkel att odla och ger mängder med gurkor, bara man är noga med vattning, omplantering, duschning och gödsling.
        Coolio
        2024-04-01
        
        Solälskande
        Lättodlat
        Ätbart
        Tomat
        En perfekt grönsak att odla på balkongen eller i trädgården. Ger riklig skörd under sommaren.
        Anna Odlare
        2024-12-05
        
        Dekorativ
        Färgstark
        Tålig
        Blommor
        Pelargon
        En vacker och lättskött blomma som trivs både inne och ute under sommaren.
        Blomsterkalle
        2024-12-03
        
        Kryddor
        Doftande
        Solälskande
        Basilika
        En fantastisk krydda för pastarätter och sallader. Trivs bäst i ett soligt fönster.
        Krydd-Malin
        2024-12-07
        
        Snabbväxande
        Ätbart
        Grönska
        Sallad
        Sallad är en av de enklaste grönsakerna att odla och ger snabba resultat för färska måltider.
        Grönis
        2024-12-06
        
        Luftfuktande
        Grönska
        Dekorativ
        Ormbunke
        En klassisk växt som passar perfekt i badrummet eller på skuggiga platser.
        Naturvännen
        2024-12-08`);
    
        let plantsSection = document.getElementById("plantsSection");
    
        data.forEach(n=> {   
            const elm = ToElm(PlantTemplate(n));
            plantsSection.appendChild(elm);
        });
    }
    
    