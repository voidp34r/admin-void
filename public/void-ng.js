/* global deepstream, angular */
angular
.module( 'ng-void-app', [] )
.service( 'deepstream', function() {
	return deepstream( 'localhost:6020' )
		.login( {username: 'ng-void-app'} );
})
.service( 'bindFields', function(){
	return function getField( $scope, record, names ) {
		angular.forEach( names, function( name ){
			Object.defineProperty( $scope, name, {
				get: function() {
					return record.get( name );
				},
				set: function( newValue ) {
					if( newValue === undefined ) {
						return;
					}
					record.set( name, newValue );
				}
			});
		});

		record.subscribe(function() {
			if( !$scope.$$phase ) {
				$scope.$apply();
			}
		});
	};
})
.controller( 'user', function( deepstream, $scope, bindFields ) {

	var fields = [
			'firstname',
			'lastname',
			'title',
			'street',
			'number',
			'postcode',
			'city'
		];

	for (i=0; i<1; i++) {
		var record2 = deepstream.record.getRecord('void', function (err){
			if (err){
				console.log('erro: ', err);
			}
			console.log('record2: ', record2);
		});
		
	}
	// record2.set('void', {name: 'Matheus', type: 'Developer'});
	// console.log('record2 updated: ', record2);

	var record = deepstream.record.getAnonymousRecord();

	bindFields( $scope, record, fields );

	$scope.$root.$on( 'show-user', function( event, recordName ) {
		$scope.name = recordName;
		record.setName( recordName );
	});
})
.controller( 'users', function( $scope, deepstream ){
	var list = deepstream.record.getList( 'users' );
	$scope.users = [];

	list.subscribe(function( entries ){
		function scopeApply() {
			if( !$scope.$$phase ) {
				$scope.$apply();
			}
		}
		$scope.users = entries.map(function( entry ){
			var record = deepstream.record.getRecord( entry );
			record.subscribe( scopeApply );
			return record;
		});

		scopeApply();
	});

	$scope.addUser = function() {
		var name = 'users/' + deepstream.getUid();

		deepstream
			.record
			.getRecord( name )
			.set({
				firstname: 'New',
				lastname: 'User',
				title: '-'
			});

		list.addEntry( name );
	};

	$scope.selectUser = function( recordName ) {
		$scope.selectedUser = recordName;
		$scope.$root.$emit( 'show-user', recordName );
	};

	$scope.deleteUser = function( recordName ) {
		list.removeEntry( recordName );
		deepstream.record.getRecord( recordName ).delete();
	};
});
