'use strict';

app.SQLite = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_SQLite
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_SQLite
(function(parent) {
    var dataProvider = app.data.probaDeLaNavegacion,
        mode = 'signin',
        init = function (error) {
            alert("init->mode: " + mode);
            if (error) {
                if (error.message) {
                    alert(error.message);
                }
                return false;
            }

            var activeView;
            switch (mode) {
                case 'signin':
                    activeView = '.signin-view';
                    break;
                case 'reset-view':
                    activeView = '.reset-view';
                    break;
                case 'logout-view':
                    activeView = '.logout-view';
                    break;
                default:
                    activeView = '.signup-view';
                    break;
            }

            // var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';
            if (dataProvider.setup && dataProvider.setup.offlineStorage && !app.isOnline()) {
                // $('.offline').show().siblings().hide();
                alert("offline");
            } else {
                // $(activeView).show().siblings().hide();
                alert("activeView");
            }
        },
        processImage = function(img) {
            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            } else if (img.slice(0, 4) !== 'http' &&
                img.slice(0, 2) !== '//' && img.slice(0, 5) !== 'data:') {
                var setup = dataProvider.setup || {};
                img = setup.scheme + ':' + setup.url + setup.appId + '/Files/' + img + '/Download';
            }

            return img;
        },
        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Activities',
                dataProvider: dataProvider
            },

            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    dataItem['PictureUrl'] =
                        processImage(dataItem['Picture']);

                    flattenLocationProperties(dataItem);
                }
            },
            error: function(e) {
                if (e.xhr) {
                    alert(JSON.stringify(e.xhr));
                }
            },
            schema: {
                model: {
                    fields: {
                        'Text': {
                            field: 'Text',
                            defaultValue: ''
                        },
                        'Likes': {
                            field: 'Likes',
                            defaultValue: ''
                        },
                        'Picture': {
                            field: 'Picture',
                            defaultValue: ''
                        },
                    },
                    icon: function() {
                        var i = 'globe';
                        return kendo.format('km-icon km-{0}', i);
                    }
                }
            },
            serverFiltering: true,
            serverSorting: true,
            serverPaging: true,
            pageSize: 50
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        SQLiteModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/SQLite/details.html?uid=' + e.dataItem.uid);
            },
            addClick: function() {
                app.mobileApp.navigate('#components/SQLite/add.html');
            },
            editClick: function() {
                var uid = this.currentItem.uid;
                app.mobileApp.navigate('#components/SQLite/edit.html?uid=' + uid);
            },
            deleteClick: function() {
                var dataSource = SQLiteModel.get('dataSource');

                dataSource.remove(this.currentItem);

                dataSource.one('change', function(e) {
                    app.mobileApp.navigate('#:back');
                });

                dataSource.sync();
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = SQLiteModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                itemModel.PictureUrl = processImage(itemModel.Picture);
                if (!itemModel.Text) {
                    itemModel.Text = String.fromCharCode(160);
                }
                SQLiteModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('addItemViewModel', kendo.observable({
        onShow: function(e) {
            // Reset the form data.
            this.set('addFormData', {
                username: '',
                dropdownlist: '',
            });
        },
        onSaveClick: function(e) {
            var addFormData = this.get('addFormData'),
                dataSource = SQLiteModel.get('dataSource');

            dataSource.add({
                Text: addFormData.username,
                Location: addFormData.dropdownlist,
            });

            dataSource.one('change', function(e) {
                app.mobileApp.navigate('#:back');
            });

            dataSource.sync();
        }
    }));

    parent.set('editItemViewModel', kendo.observable({
        onShow: function(e) {
            var itemUid = e.view.params.uid,
                dataSource = SQLiteModel.get('dataSource'),
                itemData = dataSource.getByUid(itemUid);

            this.set('itemData', itemData);
            this.set('editFormData', {
                username1: itemData.Text,
                dropdownlist1: itemData.Location,
            });
        },
        onSaveClick: function(e) {
            var editFormData = this.get('editFormData'),
                itemData = this.get('itemData'),
                dataSource = SQLiteModel.get('dataSource');

            // prepare edit
            itemData.set('Text', editFormData.username1);
            itemData.set('Location', editFormData.dropdownlist1);

            dataSource.one('change', function(e) {
                app.mobileApp.navigate('#:back');
            });

            dataSource.sync();
        }
    }));

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('SQLiteModel', SQLiteModel);
        });
    } else {
        parent.set('SQLiteModel', SQLiteModel);
    }
})(app.SQLite);

// START_CUSTOM_CODE_SQLiteModel
// END_CUSTOM_CODE_SQLiteModel