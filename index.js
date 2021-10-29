let totalPrice = document.querySelector('#total')
//Input
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
//Comanda
class Bill {
  constructor() {
    this.items = [];
    this.total = 0;
  }
  //
  addItem = item => {
    this.items.push(item);
  }
  //
  removeItem = nome => {
  
    this.items.splice(nome, 1);
    bill.render();

    let total = bill.items.reduce(getTotal, 0);

    function getTotal(total, item){
      return total + parseFloat(item.price);
    }
    totalPrice.innerHTML = 'R$ ' + '<span id="precoTotal">' + total + '</span>';
  }
  //
  billTotal = () => {
    let total = bill.items.reduce(getTotal, 0);
    function getTotal(total, item){
      return total + parseFloat(item.price);
    }
    totalPrice.innerHTML = 'R$ ' + '<span id="precoTotal">' + total + '</span>';
  }
  //
  render = () => {
    let billContainer = document.querySelector('#items');
    billContainer.innerHTML = '';

    if(bill.items.length == 0){
      comandaVazia();
    } else {
      this.items.map(item => {
        let posicao = this.items.indexOf(item);
        let row = document.createElement('tr');
        let foodName = document.createElement('td');
        let foodPrice = document.createElement('td');
        //Remover itens da comanda ao clicar no nome
        foodName.onclick = function(){
          let response = confirm('Tem certeza que deseja excluir esse item da comanda?')
          if (response) {
            bill.removeItem(posicao);
          }
        }
        //
        foodName.innerHTML = item.name;
        foodPrice.innerHTML = 'R$ ' + item.price;
        row.append(foodName);
        row.append(foodPrice);
        billContainer.append(row);
      })
    }
  }
}
//Array vazio
function comandaVazia(){
  let elements = document.querySelector('#items');
      elements.innerHTML = '<h1 style="color: #B22222; margin-left: 100px;">A comanda está vazia!</h1>';
}
//Instanciar
const bill = new Bill();
//
function init() {
  
  totalPrice.innerHTML = 'R$ 0.00';

  if(bill.items.length == 0){
    comandaVazia();
  }
  document.getElementsByTagName('body')[0].style.display = 'flex';
}
//Listar os itens do pedido
function adicionarItem(){
  let itemName = document.querySelector('#name').value;
  let itemPrice = document.querySelector('#price').value;

  if(itemName == '' || itemPrice == ''){
    alert("Por favor, informar dados do produto a serem adicionados na comanda.");
  } else {
    //Adicionar novos itens na comanda
    bill.addItem(new Item(itemName, itemPrice));
    //Calcular o valor do total do pedido
    bill.billTotal();
    //Renderizar comanda
    bill.render();
    //Limpar Input
    limpar();
  }
}
//Limpar campos de input - nome e preço
function limpar(){
  let inputName = document.querySelector('#name');
  let inputPrice = document.querySelector('#price');

  inputName.value = '';
  inputPrice.value = '';
}
//Imprimir pedido
function printOk(){
  window.print();
  let totalPrice = document.querySelector('#total');
  bill.items.length = 0;
  bill.removeItem();
  totalPrice.innerHTML = 'R$ 0,00';
  limpar();
}
function printBill() {
  if(bill.items.length == 0){
    let decisao = confirm("Tem certeza que deseja imprimir a comanda vazia?");
    if (decisao == true){
      printOk();
    } else {
      limpar();
    }
  } else {
    printOk();
  }
}