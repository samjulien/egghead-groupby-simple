import { from } from "rxjs";
import {
  groupBy,
  mergeMap,
  switchMap,
  toArray,
  map,
  mergeAll,
} from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";

const todosFetch$ = fromFetch(
  "https://jsonplaceholder.typicode.com/todos",
).pipe(switchMap(res => res.json()));

const todos$ = from([
  {
    id: 1,
    userId: 1,
    title: "Chop wood",
    completed: false,
  },
  {
    id: 2,
    userId: 2,
    title: "Feed chickens",
    completed: false,
  },
  {
    id: 3,
    userId: 1,
    title: "Learn RxJS",
    completed: false,
  },
  {
    id: 4,
    userId: 2,
    title: "Encourage someone",
    completed: false,
  },
]);

const source$ = todosFetch$.pipe(
  mergeMap(data => from(data)),
  groupBy((item: any) => item.userId),
  mergeMap(group =>
    group.pipe(toArray()),
  ),
);

source$.subscribe(value =>
  console.log(value),
);
