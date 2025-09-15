function validarRecinto(recinto) {

    const limites = {
        "El-puente-de-los-enamorados-izquierda": 4,
        "El-puente-de-los-enamorados-derecha": 4,
        "El-puesto-de-observación": 1,
        "Zona-de-cuarentena": 1,
        "El-trío-frondoso": 3,
        "El-rey-de-la-selva": 1,
        "La-isla-solitaria": 1,
        "Rio": 8
    };

    const recintoNombre = recinto.classList[2] || "Rio";

    const maxDinos = limites[recintoNombre] || 6;

    const dinosEnRecinto = recinto.querySelectorAll("img").length;

    return dinosEnRecinto < maxDinos;
}

function validarDado(recinto, dino) {

    if (recinto.classList.contains("Rio")) return true;

    const dado = localStorage.getItem("dado");
    const nombreRecinto = recinto.classList[2];

    const cafeteria = ["La-pradera-del-amor", "El-trío-frondoso", "El-bosque-de-la-semejanza", "Zona-de-cuarentena", "El-puente-de-los-enamorados-izquierda", "El-Bosque-Ordenado"];
    const banos = ["La-pirámide", "El-puente-de-los-enamorados-derecha", "El-puesto-de-observación", "El-rey-de-la-selva", "El-prado-de-la-diferencia", "La-isla-solitaria"];
    const bosque = ["El-bosque-de-la-semejanza", "El-rey-de-la-selva", "El-trío-frondoso", "El-Bosque-Ordenado", "El-puesto-de-observación", "El-puente-de-los-enamorados-izquierda"];
    const llanura = ["El-puente-de-los-enamorados-derecha", "La-pirámide", "Zona-de-cuarentena", "La-isla-solitaria", "La-pradera-del-amor", "El-prado-de-la-diferencia"];

    switch (dado) {
        case "1":
            const existeTrex = Array.from(recinto.querySelectorAll("img")).some(img => img.alt.toLowerCase() === "t-rex");

            return !existeTrex;

        case "2":
            return llanura.includes(nombreRecinto);

        case "3":
            return recinto.querySelectorAll("img").length === 0;

        case "4":
            return bosque.includes(nombreRecinto);

        case "5":
            return banos.includes(nombreRecinto);

        case "6":
            return cafeteria.includes(nombreRecinto);
    }
}
