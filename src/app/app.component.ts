    import { Component, OnDestroy } from '@angular/core';
    import { Injectable } from '@angular/core';
    import { AngularFireDatabase } from '@angular/fire/compat/database';
    import { object } from '@angular/fire/database';
    import { get, ref, child } from 'firebase/database';
    import { Observable, Subscription } from 'rxjs'

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrl: './app.component.scss'
    })
    export class AppComponent  {
      title = 'bassam';
      courses:any; // Observable for courses array
      course: any;   // Observable for a single course
      authors: any;
      constructor(private afDatabase: AngularFireDatabase) {

        this.courses  = this.getDatabase('/courses').subscribe((courses) => {
          this.courses = courses;
        }); 
        this.course = this.getDatabase('/courses/1').subscribe((course) => {
          
          this.course = course;});
        const newLocal = this;
         newLocal.getDatabase('/authors').subscribe((authors) => {
          this.authors = authors;
         });
        
      }

      getDatabase(databasePath: string): Observable<any> {

        const dbRef = ref(this.afDatabase.database);
        
        return new Observable<any>((observer) => {
          get(child(dbRef, databasePath)).then((snapshot) => {
            if (snapshot.exists()) {
              const coursesArray = snapshot.val();
            const courses = Object.keys(coursesArray).map(key => coursesArray[key]);
              observer.next(courses);
              observer.complete();
            } else {
              observer.next({});
              observer.complete();
            }
          }).catch((error) => {
            observer.error(error);
          });
        });
      }
add(course: HTMLInputElement){

this.courses.push(
  {name: course.value
, price: 150,
isLive: true,
sections: [
  {title: 'Introduction'},
  {title: 'Components'},
  {title: 'Directives'},
]
})

course.value = '';
}


    }
