function pageTurn(totalPage, urlObj, selector, deleteData) {   //实现分页功能，不用修改直接使用
	var currentPage = 1;

	var totalPage = totalPage;

	var pageSize = 10;

	$("#pageer .pre")[0].onclick = function() {

		currentPage--;

		if(currentPage >= 1 && currentPage <= totalPage) {

			$(".content-wait").removeClass("hidden"); //show wait ajax
		
		
			ajaxTemplate();
		} else if(currentPage < 1) {

			currentPage = 1; //keep page left border

			//			------- animation ------------

			$(".content-page").removeClass('hidden');

			$("#pageer button").addClass('disabled');

			$(".content-page .first-page").fadeIn(500).delay(500).fadeOut(500, function() {

				//Restore initialization
				$("#pageer button").removeClass('disabled');
				$(".content-page").addClass('hidden');

			});
			//			------- animation ------------

		}

	}

	$("#pageer .next")[0].onclick = function() {
		currentPage++;
		console.log(currentPage);
		if(currentPage >= 1 && currentPage <= totalPage) {

			$(".content-wait").removeClass("hidden"); //show wait ajax

			ajaxTemplate();
		} else if(currentPage > totalPage) {

			currentPage = totalPage; //keep page right border

			//			------- animation ------------

			$(".content-page").removeClass('hidden');

			$("#pageer button").addClass('disabled');

			$(".content-page .last-page").fadeIn(500).delay(500).fadeOut(500, function() {

				//Restore initialization
				$("#pageer button").removeClass('disabled');
				$(".content-page").addClass('hidden');

			});

			//			------- animation ------------

		}

	}

	$("#pageer .turnBtn")[0].onclick = function() {

		if($("input.turnToPage").val() < 1 || $("input.turnToPage").val() > totalPage) {
			//keep page correct

			//			------- animation ------------

			$(".content-page").removeClass('hidden');

			$("#pageer button").addClass('disabled');

			$(".content-page .notFound").fadeIn(500).delay(500).fadeOut(500, function() {

				//Restore initialization
				$("#pageer button").removeClass('disabled');

				$(".content-page").addClass('hidden');

			});

			//			------- animation ------------
			return;
		}

		currentPage = $("input.turnToPage").val();

		if(currentPage >= 1 && currentPage <= totalPage) {

			$(".content-wait").removeClass("hidden"); //show wait ajax

			ajaxTemplate();
		}

	};

	function ajaxTemplate() {
		templateFun({
			type: "get",
			url: urlObj.detailURL,
			data: {
				pageNumber: currentPage,
				pageSize: pageSize
			},
			selector: selector,
			fn: function() {
				$(".content-wait").addClass("hidden"); // wait ajax info

				infoRemove(function(id) {
					$.ajax({
						type: "get",
						url: urlObj.deleteURL,
						data: deleteData,
						success: function(data) {
							console.log(data);

							$(".content-wait").addClass("hidden"); // wait ajax info
						}
					});
				}); //remove item

				getInfo(urlObj.getURL); //get item detail

				editInfo(urlObj.editURL); // edit item info

				//show current page
				$("#pageer .current").html(currentPage);
				$("#pageer .current").val(currentPage);
				removeTip();

				//check url weather is carlist
//				获取当前是在哪一个页面
				var currentUrl = window.location.pathname;
				
//				如果在admin_carlist.html,因为在这个页面里面有特殊的功能,所以调用下面函数
				if(currentUrl.indexOf('/admin_carlist.html') != -1 ) {
					brandList();
					bodyTypeList();
				} else if(currentUrl.indexOf('/admin_subscribesaleslist.html') != -1 ) {
					clickInfo();
				} else if(currentUrl.indexOf('/admin_qalist.html') !=  -1) {
					userList();
					clickInfo();
				}else if(currentUrl.indexOf('/admin_testdrivelist.html') != -1 ){
					clickInfo();
				}else if( currentUrl.indexOf('/admin_dealerlist.html') != -1 ){
					upTop("https://www.buycarsmart.com.au/smartcar/admin/dealer/editDealerBy.do",'admin_dealerlist.html');
					signIn();
				}else if( currentUrl.indexOf('/admin_saleslist.html') != -1 ){
					upTop("https://www.buycarsmart.com.au/smartcar/admin/sales/editSalesBy.do",'admin_saleslist.html');
				}

			}

		});
	}
}

function signIn() {
	$(".signIn").each(function() {
		$(this).click(function() {
			$(".content-signIn").removeClass('hidden');
			$(".signInBtn").attr('data-id', $(this).attr('data-id'));
			$(".signInBtn").attr('data-nickname', $(this).attr('data-nickname'));

			//form vaild	
			formVaild();
			signUpload();

			$(".content-signIn .close").click(function() {
				$(".content-signIn").addClass('hidden');
			})

		})
	})

	function signUpload() {
		$(".signInBtn").click(function() {
			if($("input[name='username']").val() == '' && $("input[name='password']").val() == '') {
				$("input[name='username']").parent().parent().addClass('has-error');
				$("input[name='password']").parent().parent().addClass('has-error');

				return;
			} else if($("input[name='username']").val() == '') {
				$("input[name='username']").parent().parent().addClass('has-error');

				return;
			} else if($("input[name='password']").val() == '') {
				$("input[name='password']").parent().parent().addClass('has-error');

				return;
			} else if($("input[name='password']").val() !== $("#confirm").val()) {
				return;
			} else {
				$(".content-wait	").removeClass('hidden');

				$.ajax({
					type: "get",
					url: "https://www.buycarsmart.com.au/smartcar/admin/user/addAdminUser.do",
					data: {
						username: $("input[name='username']").val(),
						password: md5($("input[name='password']").val()),
						dealerId: $(this).attr('data-id'),
						nickname: $(this).attr('data-nickname'),
						adminUserSessionId: getCookie('sessionKey')
					},
					dataType: 'json',
					success: function(data) {
						if(data.result.code == 1) {
							alert('Registration failed! Account has been registered！');
							return;
						}
						$("input[name='username']").val('');
						$("input[name='password']").val('');
						$(".content-wait	").addClass('hidden');
						$(".content-signIn").addClass('hidden');

					},
					error: function(error) {
						$(".content-loadError").removeClass('hidden');
						$(".imageUploadMsg").html('The page load failed, please reload');
						$(".close").click(function() {
							$(".content-imageError").addClass('hidden');
						})
					}
				});
			}
		})
	}

	function formVaild() {
		//name vaild
		vaild("input[name='username']", "#usernameTip", /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/, 'Can not be empty', 'Can only be numbers or letters，And must be greater than four');

		//tel vaild
		vaild("input[name='password']", "#passwordTip", /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/, 'Can not be empty', 'Can only be numbers or letters，And must be greater than four');

		$("#confirm").change(function() {
			$(this).parent().parent().removeClass('has-error has-success');
			$("#confirmTip").addClass('hidden');
			if($(this).val() != $("input[name='password']").val()) {
				$(this).parent().parent().addClass('has-error');
				$("#confirmTip").removeClass('hidden').html('Make sure the password is not the same as the password. Please confirm');
				$(".saveInfo").addClass('disabled');
			} else {
				$(this).parent().parent().addClass('has-success');
				$("#confirmTip").addClass('hidden');
				$(".saveInfo").removeClass('disabled');
			}

		})
	}

	function vaild(selector, tip, reg, contain1, contain2) {
		$(selector).on('blur', function() {
			var re = reg;

			$(tip).addClass('hidden').parent().parent().removeClass('has-error has-success');

			if($(this).val() == '') {
				$(tip).html(contain1).removeClass('hidden').parent().parent().addClass('has-error');
			} else if(!reg.test($(this).val())) {
				$(tip).html(contain2).removeClass('hidden').parent().parent().addClass('has-error');
			} else {
				$(tip).addClass('hidden').parent().parent().addClass('has-success');
			}
		});
	}

}


function upTop(url,lUrl) {
	$(".upTop").click(function() {
		$.ajax({
			type: "get",
			url: url,
			data: {
				pk: $(this).attr("data-id"),
				sort: (parseInt($(this).attr('data-maxSort')) + 1)
			},
			dataType: 'json',
			success: function(data) {
				if(data.result.code == 0) {
					location.href = lUrl;
				} else if(data.result.code == 1) {
					$(".content-loadError").removeClass('hidden');
					$(".imageUploadMsg").html('The page load failed, please reload');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
				}
			},
			error: function() {
				$(".content-loadError").removeClass('hidden');
				$(".imageUploadMsg").html('The page load failed, please reload');
				$(".close").click(function() {
					$(".content-imageError").addClass('hidden');
				})
			}
		});
	})
}


function brandList() {
	$.ajax({
		type: "get",
		url: "https://www.buycarsmart.com.au/smartcar/admin/model/admin_listBrandBy.do",
		dataType: 'json',
		success: function(data) {
			//merge form brand item
			$(".brandId").each(function() {
				var brandId = $(this).attr('data-value');
				console.log(brandId);
				for(var i = 0, len = data.data.length; i < len; i++) {
					if(brandId == data.data[i].brandId) {
						$(this).html(data.data[i].name);
						break;
					}
				}
			});
		}
	});
}

function bodyTypeList() {
	$.ajax({
		type: "get",
		url: "https://www.buycarsmart.com.au/smartcar/admin/model/admin_listBodyTypeBy.do",
		dataType: 'json',
		success: function(data) {
			//merge form brand item
			$(".bodyTypeId").each(function() {
				var bodyTypeId = $(this).attr('data-value');
				//				console.log(bodyTypeId);
				for(var i = 0, len = data.data.length; i < len; i++) {
					if(bodyTypeId == data.data[i].bodyTypeId) {
						$(this).html(data.data[i].name);
						break;
					}
				}
			});
		}
	});
}

function userList() {
	$.ajax({
		type: "get",
		url: "https://www.buycarsmart.com.au/smartcar/admin/user/admin_listUserBy.do",
		dataType: 'json',
		success: function(data) {

			//deal with error
			if(data.result.code == 1) {
				return;
			}

			console.log(data);

			//merge form brand item
			$(".userId").each(function() {
				var userId = $(this).attr('data-value');
				//				console.log(brandId);
				for(var i = 0, len = data.data.length; i < len; i++) {
					if(userId == data.data[i].userId) {
						$(this).html('<a style="color: #000000" >' + data.data[i].firstName + ' ' + data.data[i].lastName + '</a>');
						break;
					}
				}
			});

			//			//brandlist vaild
			//			brandListVaild();

		},
		error: function(error) {
			return;
		}
	});

}

function clickInfo() {
	$(".clienInfo").each(function() {
		$(this).click(function() {

			$(".content-wait").removeClass('hidden');

			var userId = $(this).attr('data-id');

			$.ajax({
				type: "get",
				url: "https://www.buycarsmart.com.au/smartcar/admin/user/admin_getUserBy.do",
				data: {
					userId: userId
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					$(".content-wait	").addClass('hidden');
					
					if(data.result.code == 1) {
						$(".content-loadError").removeClass('hidden');
						$(".imageUploadMsg").html('The page load failed, please reload');
						$(".close").click(function() {
							$(".content-imageError").addClass('hidden');
						})
						return;
					}
					
					
					var htmlstr = "<h3 style='border-bottom: 1px solid #E6E6E6;padding-bottom:6px;' >Client's Infomation</h3>" +
						"<p>First Name: " + data.user.firstName + "</p>" +
						"<p>Last Name:" + data.user.lastName + "</p>" +
						"<p>Mobile: " + data.user.mobile + "</p>" +
						"<p>Post Code: " + data.user.postcode + "</p>" +
						"<p>Title: " + data.user.title + "</p>" +
						"<p>E-mail: " + data.user.email + "</p>";
					$(".infoDetail").html(htmlstr);

					$(".content-info").removeClass('hidden');

					$(".content-info>div>div").fadeIn(400);
				},
				error: function(error) {
					$(".content-loadError").removeClass('hidden');
					$(".imageUploadMsg").html('The page load failed, please reload');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})

				}
			});
		})
	});

	$(".dealerInfo").each(function() {
		$(this).click(function() {

			$(".content-wait").removeClass('hidden');

			var dealerId = $(this).attr('data-id');

			$.ajax({
				type: "get",
				url: "https://www.buycarsmart.com.au/smartcar/admin/dealer/getDealerBy.do",
				data: {
					pk: dealerId
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					$(".content-wait	").addClass('hidden');
					
					if(data.result.code == 1) {
						$(".content-loadError").removeClass('hidden');
						$(".imageUploadMsg").html('The page load failed, please reload');
						$(".close").click(function() {
							$(".content-imageError").addClass('hidden');
						})
						return;
					}
					
					
					var htmlstr = "<h3 style='border-bottom: 1px solid #E6E6E6;padding-bottom:6px;' >Dealer's Infomation</h3>" +
						"<p>Name : " + data.Dealer.name + "</p>" +
						"<p>Phone : " + data.Dealer.phone + "</p>" +
						"<p>Address : " + data.Dealer.address + "</p>" +
						"<h6 style='border-bottom: 1px solid #E6E6E6; padding-bottom: 4px;text-align:right;margin-right:5px;' >Work Time</h6>" +
						"<p>Workday Work Time : " + data.Dealer.workTimeAM + " : 00  -  " + data.Dealer.workTimePM + " : 00</p>" +
						"<p>Sat Work Time : " + data.Dealer.satTimeAM + " : 00  -  " + data.Dealer.satTimePM + " : 00</p>" +
						"<p>Sun Work Time : " + data.Dealer.sunTimeAM + " : 00  -  " + data.Dealer.sunTimePM + " : 00</p>";
					$(".infoDetail").html(htmlstr);

					$(".content-info").removeClass('hidden');

					$(".content-info>div>div").fadeIn(400);
				},
				error: function(error) {
					$(".content-loadError").removeClass('hidden');
					$(".imageUploadMsg").html('The page load failed, please reload');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})

				}
			});

		})
	});

	$(".salesInfo").each(function() {
		$(this).click(function() {

			$(".content-wait").removeClass('hidden');

			var salesId = $(this).attr('data-id');

			$.ajax({
				type: "get",
				url: "https://www.buycarsmart.com.au/smartcar/admin/sales/getSalesBy.do",
				data: {
					pk: salesId
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					$(".content-wait	").addClass('hidden');
					
					if(data.result.code == 1) {
						$(".content-loadError").removeClass('hidden');
						$(".imageUploadMsg").html('The page load failed, please reload');
						$(".close").click(function() {
							$(".content-imageError").addClass('hidden');
						})
						return;
					}
					
					
					var htmlstr = "<div style='text-align:center;padding-right:34px;'><h3 style='border-bottom: 1px solid #E6E6E6;padding-bottom:6px;' >Sales's Infomation</h3>" +
						"<img style='width:50px;height:50px;border-radius:5px;margin-bottom:10px;' src=https://www.buycarsmart.com.au/" + data.sales.avatar + " alt='' />" +
						"<p>Name : " + data.sales.name + "</p>" +
						"<p>Mobile : " + data.sales.phone + "</p>" +
						"<p>E-mail : " + data.sales.email + "</p>" +
						"<p>Address : " + data.sales.address + "</p></div>";
					$(".infoDetail").html(htmlstr);

					$(".content-info").removeClass('hidden');

					$(".content-info>div>div").fadeIn(400);
				},
				error: function(error) {
					$(".content-loadError").removeClass('hidden');
					$(".imageUploadMsg").html('The page load failed, please reload');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
				}
			});

		})
	});

	$(".userInfo").each(function() {
		$(this).click(function() {

			$(".content-wait").removeClass('hidden');

			var userId = $(this).attr('data-id');

			$.ajax({
				type: "get",
				url: "https://www.buycarsmart.com.au/smartcar/admin/user/admin_getUserBy.do",
				data: {
					userId: userId
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					$(".content-wait	").addClass('hidden');

					if(data.result.code == 1) {
						$(".content-loadError").removeClass('hidden');
						$(".imageUploadMsg").html('The page load failed, please reload');
						$(".close").click(function() {
							$(".content-imageError").addClass('hidden');
						})
						return;
					}

					var htmlstr = "<h3 style='border-bottom: 1px solid #E6E6E6;padding-bottom:6px;' >User's Infomation</h3>" +
						"<p>First Name: " + data.user.firstName + "</p>" +
						"<p>Last Name:" + data.user.lastName + "</p>" +
						"<p>Mobile: " + data.user.mobile + "</p>" +
						"<p>Post Code: " + data.user.postcode + "</p>" +
						"<p>Title: " + data.user.title + "</p>" +
						"<p>E-mail: " + data.user.email + "</p>";
					$(".infoDetail").html(htmlstr);

					$(".content-info").removeClass('hidden');

					$(".content-info>div>div").fadeIn(400);
				},
				error: function(error) {
					$(".content-loadError").removeClass('hidden');
					$(".imageUploadMsg").html('The page load failed, please reload');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})

				}
			});
		})
	});

	$(".closeInfo").each(function() {
		$(this).click(function() {
			$(".content-info").addClass('hidden');

			$(".content-info>div>div").fadeOut(50);
		})
	})
}