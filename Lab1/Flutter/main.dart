

import 'package:flutter/material.dart';

void main() => runApp(Body());

/// This is the main application widget.
class Body extends StatelessWidget {
  static const String _title = 'Example1';



  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title),
        backgroundColor: Colors.teal,),
        body: MyStatelessWidget(),
      ),
    );
  }
}

/// This is the stateless widget that the main application instantiates.
class MyStatelessWidget extends StatelessWidget {
  MyStatelessWidget({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
    body: Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
         Image(
           image: AssetImage('assets/android.png'),
           height: 200,
         ),

        Column(
          children: List.generate(2, (m){
            return Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(2, (n){
                  return RaisedButton(
                  child: Text("Button"),
                  onPressed: () {});
                }
                ),
            );
          })
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Flexible(
              child: Padding(
                padding: const EdgeInsets.all(45.0),
                child:Text("Email"),
              )
            ),

            Flexible(
                  child:TextField(
                    cursorWidth: 3,
                    cursorHeight: 30,
                    cursorColor: Colors.red,
                    decoration: InputDecoration(
                      focusedBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: Colors.red),
                      ),
                    ),
                  )
                )
          ],
        ),
      ],
    ),
    );

  }
}
