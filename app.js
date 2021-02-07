class Sites{
    constructor(name, url){
        this.name = name;
        this.url = url;
    }
}

class Store{
    static getData(){
        var sites = [];
        if(localStorage.getItem('sitesData') != null){
            sites = localStorage.getItem('sitesData');
            sites = JSON.parse(sites);
            console.log('if');
        }else{
            console.log('else');
            sites = []
        }
        return sites;
    }

    static setData(site){
        var flag = 0;
        var data = Store.getData();
        for(var i = 0; i < data.length; i++){
            if(data[i].name === site.name){
                flag = 1;
                break;
            }
        }
        if(!flag){
            data.push(site);
        }
        localStorage.setItem('sitesData' ,JSON.stringify(data));
    }

    static removeData(siteName){
        var data = Store.getData();
        var dataUpdate = data.filter((ele) => {
            return (ele.name != siteName);
        });
        localStorage.setItem('sitesData', JSON.stringify(dataUpdate));
    }
}

class UI{
    static displayToDom(site){
        var out = document.getElementById('out');
        var div = document.createElement('div');
        div.className = 'card d-flex flex-row gap-3 mt-2 align-items-center';
        div.innerHTML = `
            <label class="">${site.name}</label>
            <a href="${site.url}" class="btn btn-secondary" target="_blank">Visit</a>
            <a class="btn btn-danger delete">Delete</a>
        `;
        out.appendChild(div);
        UI.alert('Entry Added', 'success');
        //UI.removingAlerts();
        Store.setData(site);
    }

    static clearFeilds(){
        document.getElementById('name').value = '';
        document.getElementById('url').value = '';
    }

    static gettingSites(siteArray){
        siteArray.forEach((site) => {
            UI.displayToDom(site);
        })
    }

    static deleteItem(e){
        if(e.target.classList.contains('delete')){
            if(confirm('Are You Sure?')){
                Store.removeData(e.target.parentElement.firstElementChild.textContent);
                e.target.parentElement.remove();
                UI.alert('Entry Deleted', 'danger');
                //UI.removingAlerts();
            }
        }
        
    }

    static alert(msg, type){
        var ele = document.getElementById('alert-out');
        if(ele.children.length < 1){
            console.log('Multiple Alert Check...');
            var div = document.createElement('div');
            div.className = `alert alert-${type} text-start`;
            div.appendChild(document.createTextNode(msg));

            ele.appendChild(div);

            UI.removingAlerts();
        }
        
    }

    static removingAlerts(){
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // var storedSites = [
    //     {
    //         name: 'Facebook',
    //         url: 'https://www.facebook.com',
    //     },
    
    //     {
    //         name: 'Google',
    //         url: 'https://www.google.com',
    //     },
    
    //     {
    //         name: 'Twitter',
    //         url: 'https://www.twiiter.com',
    //     }
    // ];

    document.getElementById('out').innerHTML = '';
    var storedSites = Store.getData();

    UI.gettingSites(storedSites);

    //storedSites.forEach((site) => UI.displayToDom(site));
});

document.getElementById('input-form').addEventListener('submit', (e) => {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var url = document.getElementById('url').value;

    if(name != '' || url != ''){
        var site = new Sites(name, url);
        UI.displayToDom(site);
    }else{
        UI.alert('Feilds Empty', 'danger');
        //UI.removingAlerts();
    }

    UI.clearFeilds();
});

document.getElementById('out').addEventListener('click', (e) => UI.deleteItem(e));

console.log('Test');