# GSForms - Guiosoft Forms

Sistema de avaliação com layout dinâmico
[[https://www.youtube.com/watch?v=dbVQqcV9iEc]]

## Formato de Troca de Dados

JSON

## Layout do arquivo de avaliação

### Informações básicas do form

* **form.id** = Identificação (código) do form, utilizado para referenciar o form em um sistema de banco de dados.
* **form.description** = Nome do form, que será exibido no cabeçalho da aplicação (web ou desktop)
* **form.version** = Versão do form
* **form.note** = Notas/observações que serão exibidas abaixo do nome do form

### Campos do form

* **name** = Nome do campo
* **description** = Descrição do campo que será apresentada ao usuário
* **type** = Tipo do campo (com informações opcionais)

  * **string** [maxSize] = Campo string com tamanho opcional
  * **int** [minValue,maxValue] = Campo inteiro com valores mínimo e máximo opcionais
  * **float** [minValue,maxValue]
  * **date** [minDate,maxDate]

```json
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
            "type": "Tipo do campo",
            "datasource": "Origem dos dados",
            "required": "True"
        },{
            "name":"campoInt",
            "description": "Campo Numérico Inteiro",
            "type": "int[0,10]",
            "required":"True"
        }
    ]
}
```

## Formato do DataSource para campos do tipo select

Deve ser um array JSON, com seus elementos do tipo string, ou do tipo objeto relacionando id e valor. O datasource pode, também, ser um URL apontando para uma API que retorne o array JSON.

* Elementos simples, do tipo string

```json
[
    "Opção 1",
    "Opção 2",
    "Opção 3"
]
```

* Elementos relacionando id e valor

```json
[
    {SC:"Santa Catarina"},
    {PR:"Paraná"},
    {RS:"Rio Grande do Sul"}
]
```
