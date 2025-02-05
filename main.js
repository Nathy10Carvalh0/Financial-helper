function updateSummary() {
    const rows = document.querySelectorAll('#table-body tr');
    let totalIncome = 0;
    let totalExpenses = 0;

    rows.forEach(row => {
        const value = parseFloat(row.children[2].textContent);
        const type = row.children[4].textContent.toLowerCase();

        if (type === 'income') {
            totalIncome += value;
        } else if (type === 'expenses') {
            totalExpenses += value;
        }
    });

    document.getElementById('income').innerHTML = `Income<br>R$: ${totalIncome.toFixed(2)}`;
    document.getElementById('expenses').innerHTML = `Expenses<br>R$: ${totalExpenses.toFixed(2)}`;
    document.getElementById('closing').innerHTML = `Closing<br>R$: ${(totalIncome - totalExpenses).toFixed(2)}`;
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const value = parseFloat(document.getElementById('value').value).toFixed(2);
    const where = document.getElementById('where').value;
    const type = document.getElementById('type').value;

    const tableBody = document.getElementById('table-body');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td>${value}</td>
        <td>${where}</td>
        <td>${type}</td>
    `;

    tableBody.appendChild(newRow);

    updateSummary();

    // Clear form
    document.getElementById('form').reset();
});

// Initial summary update
updateSummary();

fetch('http://localhost:3000/transacoes')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Exibe os dados no console
    })
    .catch(error => console.error('Erro ao buscar transações:', error));


    const novaTransacao = {
        data: '2025-02-04',
        descricao: 'Salário',
        valor: 3000.00,
        categoria: 'Trabalho',
        tipo: 'income'
    };
    
    fetch('http://localhost:3000/transacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaTransacao)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro ao adicionar transação:', error));
    