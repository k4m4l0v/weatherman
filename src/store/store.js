import { makeAutoObservable } from "mobx";

export class Store {
    constructor() {
        this._data = {
            data: {
                location: {
                    name: ''
                },
                current: {
                    temp: 0,
                    is_day: 0,
                    condition: {
                        text: ''
                    },
                    feelslike_c: 0
                }
            }
        };

        makeAutoObservable(this);
    }

    setData(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }
}
