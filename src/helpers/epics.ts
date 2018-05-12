import { values } from "lodash";
import { combineEpics, Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/observable/of";
import "rxjs/add/observable/concat";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import { AnyAction as Action } from "typescript-fsa";

import { State, epics } from "../redux";
import { backendError } from "../redux/backend-session";

const epic$ = new BehaviorSubject(combineEpics(...values(epics)));

export const mergeEpics: Epic<Action, State> = (action$, store) =>
  epic$.mergeMap(epic =>
    epic(action$, store, null).catch((e, stream) => {
      if (__IS_DEBUG__) {
        // tslint:disable-next-line:no-console
        console.error("Error uncaught: ", e);
      }
      return Observable.concat(
        Observable.of(
          backendError({
            output: e,
          })
        ),
        stream
      );
    })
  );

export default mergeEpics;
