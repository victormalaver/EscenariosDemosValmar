'use strict';

app.sqlite = kendo.observable({
    onShow: function () {

        refresh();
    },
    afterShow: function () {}
});

var appSqlite = {};
appSqlite.db = null;

if (window.sqlitePlugin !== undefined) {
    console.log(1);
    appSqlite.db = window.sqlitePlugin.openDatabase("My Database");

} else {
    console.log(2);
    // For debugging in simulator fallback to native SQL Lite
    appSqlite.db = window.openDatabase("My Database", "1.0", "Cordova Demo", 200000);
    var db = appSqlite.db;
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)", []);
    });

}


function createTable() {

}

function addTodo(todoText) {
    var db = appSqlite.db;
    db.transaction(function (tx) {
        var addedOn = new Date();
        tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)", [todoText, addedOn],
            onSuccess,
            onError);
    });
}

function onError(tx, e) {
    alert("Error: " + e.message);
}

function onSuccess(tx, r) {
    refresh();
}

function deleteTodo(id) {
    var db = appSqlite.db;
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
            onSuccess,
            onError);
    });
}

function refresh() {
    var renderTodo = function (row) {

        // return "<li>" + "<div class='todo-check'></div>" + row.todo + "<a class='fa fa-camera fa-2x' href='javascript:void(0);'  onclick='deleteTodo(" + row.ID + ");'><p class='todo-delete'></p></a>" + "<div class='clear'></div>" + "</li>";
        return "<li>" + "<a>" + row.todo + "<div data-role='listview'  style='float: right !important;' ><i class='fa fa-trash-o fa-lg' onclick='deleteTodo(" + row.ID + ");'></i></div></a></li>";
    }

    var render = function (tx, rs) {
        var rowOutput = "";
        var todoItems = document.getElementById("todoItems");
        for (var i = 0; i < rs.rows.length; i++) {
            rowOutput += renderTodo(rs.rows.item(i));
        }

        todoItems.innerHTML = rowOutput;
    }

    var db = appSqlite.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM todo", [],
            render,
            appSqlite.onError);
    });
    $("#textSqlite").val("");
}