class SearchView{
    #parentEl = document.querySelector('.search');
    
    getQuery(){
       const query = this.#parentEl.querySelector('.search__field').value; 
        this.#clearInput(); 
        return query;
    }

    #clearInput(){
        this.#parentEl.querySelector('.search__field').value = ''; 
    }

    addHandlerSearch(handler){
        this.#parentEl.adEventListener('submit', function(e){
            e.preventDefault();
            handler(); 
        })  
    }
}

export default new SearchView();