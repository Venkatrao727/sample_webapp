function StoresList() {
		this.scroller = new 
		this.setParams = function(params) {
			this.params = params;
		};

		this.getParams = function() {
			return this.params;
		};
	}

	Stores.prototype.getStores = function() {
		$.ajax({
			headers : {
				partnerId : "1001",
				apiKey : "d1C24bA4-4BB5-EE8b-ef85-E22ea557CC2A"
			},
			type : 'GET',
			dataType : "json",
			url : Global.serice_url+"/stores",
			data : this.params,
			success : this.successHandler,
			error: function(error) {

			}

		});
	};

	//This is just a stub, it needs to be implemented by every object.
	Stores.prototype.successHandler = function(response) {

	}

	Stores.prototype.errorHandler = function(error) {

	}