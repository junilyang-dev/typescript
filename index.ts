type DictionaryEntry = {
    term: string;
    definition: string;
};

class Dict {
    private dictionary: Record<string, string>;

    constructor() {
        this.dictionary = {};
    }
    
    // add: 단어를 추가함.
    add(term: string, definition: string): void {
        this.dictionary[term] = definition;
    }
    
    // get: 단어의 정의를 리턴함.
    get(term: string): string | undefined {
        return this.dictionary[term];
    }
    
    // delete: 단어를 삭제함.
    delete(term: string): void {
        delete this.dictionary[term];
    }
    
    // update: 단어를 업데이트 함.
    update(term: string, definition: string): void {
        if (term in this.dictionary) {
            this.dictionary[term] = definition;
        } else {
            console.log(`Error: Term '${term}' not found.`);
        }
    }
    
    // showAll: 사전 단어를 모두 보여줌.
    showAll(): void {
        for (const term in this.dictionary) {
            console.log(`${term}: ${this.dictionary[term]}`);
        }
    }
    // count: 사전 단어들의 총 갯수를 리턴함.
    count(): number {
        return Object.keys(this.dictionary).length;
    }
    
    // upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
    upsert(term: string, definition: string): void {
        this.dictionary[term] = definition;
    }
    // exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
    exists(term: string): boolean {
        return term in this.dictionary;
    }

    // bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
    bulkAdd(entries: DictionaryEntry[]): void {
        entries.forEach(entry => {
            this.dictionary[entry.term] = entry.definition;
        });
    }
    
    // bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
    bulkDelete(terms: string[]): void {
        terms.forEach(term => {
            delete this.dictionary[term];
        });
    }
}

// 사용 예시
const dict = new Dict();
dict.add("사과", "빨갛고 맛있는 과일");
dict.upsert("바나나", "길고 노란 과일");
dict.bulkAdd([{ term: "김치", definition: "대박이네~" }, { term: "아파트", definition: "비싸네~" }]);
console.log("전체 사전:");
dict.showAll();
console.log("김치의 정의:", dict.get("김치"));
dict.update("바나나", "매우 달콤한 과일");
console.log("단어 개수:", dict.count());
dict.bulkDelete(["김치", "바나나"]);
console.log("삭제 후 단어 개수:", dict.count());