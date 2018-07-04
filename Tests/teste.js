var layout =
{
    "form": {
        "id": "Identificador",
        "description": "Nome do form",
        "version": "Versão do form",
        "note": "Notas/observações"
    },
    "fields": [
        {
            "name": "Nome do campo",
            "description": "Descrição do campo",
            "tooltip":"Dica com informações do campo",
            "type": "Tipo do campo",
            "datasource": "Origem dos dados",
            "required": "True",
            "defaultvalue":""
        },
        {
            "name": "campoInt",
            "description": "Campo Numérico Inteiro",
            "tooltip":"Dica com informações do campo",
            "type": "int[0,10]",
            "required": "True",
            "defaultvalue":0
        },
        {
            "name": "campoString",
            "description": "Campo String",
            "tooltip":"Dica com informações do campo",
            "type": "string[20]",
            "required": "True",
            "defaultvalue":"Texto a vontade"
        }
    ]
}

console.log(layout.form.id);

function parseForm(idContainer, formJson) {
    var container = document.getElementById(idContainer);
    if (container == null) {
        console.error("parseForm: Container " + idContainer + " inexistente");
        return;
    }
    function addNode(parentNode, elementName = "div", nodeClass = "gsf_item") {
        var node = document.createElement(elementName);
        parentNode.appendChild(node);
        node.className = nodeClass;
        return node;
    }
    container.className = "gsf_container";
    container.innerText = "";
    var nodeHeader = addNode(container);
    nodeHeader.innerHTML = "<h1>" + formJson.form.description + "</h1>";

    var nodeBody = addNode(container, "div", "gsf_item gfs_body");

    if (formJson.form.note) {
        var nodeFooter = addNode(container);
        nodeFooter.innerHTML = "<h1>" + formJson.form.note + "</h1>";
    }

    for (var field in formJson.fields) {
        var f = formJson.fields[field];
        var label = addNode(nodeBody, "label", "gsf_label");
        label.innerText = f.description;
        switch (f.type) {
            case "string":

        }

    }


}

console.clear;

// Validar datasource
// Deve retornar um array
// ["Opção 1","Opção 2","Opção 3"]
// [{chave1="Opção 1",chave2="Opção 2"}]
function validateDatasource(datasource) {
    if (!Array.isArray(datasource)) {
        return null;
    }
    var tipo = 0;
    var errotipo = false;
    var opcoes = [];
    for (var e in datasource) {
        var elm = { id: false, value: false };
        if (tipo == 0) {
            tipo = typeof (datasource[e]);
        } else if (tipo != typeof (datasource[e])) {
            errotipo = true;
        }
        if (errotipo) {
            console.error("validateDatasource -> ERRO NO PADRÃO");
            return null;
        }
        if (tipo == "object") {
            elm.id = Object.getOwnPropertyNames(datasource[e])[0];
            elm.value = datasource[e][elm.id];
        } else {
            elm.value = datasource[e];
        }
        opcoes.push(elm);
    }
    return opcoes;
}

o = [{ SC: "Santa Catarina" }, { PR: "Paraná" }, { RS: "Rio Grande do Sul" }];
console.log(o);
o = validateDatasource(o);
console.log(o);

return;

var t = {
    nome: "Guionardo",
    vetor: ["A", "N", "C"],
    chaves: [{ id: 1, value: "V1" }, { id: 2, value: "V1" }]
};

var ds = [{ "1": "Teste" }, { 2: "Opção 2" }];
console.log(ds);


console.log(t.nome, typeof (t.nome), Array.isArray(t.nome));
console.log(t.vetor, typeof (t.vetor), Array.isArray(t.vetor));
console.log(t.chaves, typeof (t.chaves), Array.isArray(t.chaves));
