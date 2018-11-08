function formValidator(formSelector){
	return (function(){
		$(formSelector).bootstrapValidator({

            　feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                username: {
                    validators: {
                        notEmpty: {
                            message: 'username can not be empty'
                        },
                        stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: 'username must be more than 6 characters, less than 30 characters'
                    	},
                    	regexp: {
	                        regexp: /^[a-zA-Z0-9_]+$/,
	                        message: 'username can only be lowercase letters, uppercase letters, numbers'
                    	}
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'password can not be empty'
                        },
                        stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: 'password must be more than 6 characters, less than 30 characters'
                    	},
                    	regexp: {
	                        regexp: /^[a-zA-Z0-9_]+$/,
	                        message: 'password can only be lowercase letters, uppercase letters, numbers'
                    	}
                    }
                },
                confirm: {
                    validators: {
                        notEmpty: {
                            message: 'password can not be empty'
                        }
                    }
                },
                role: {
                    validators: {
                        notEmpty: {
                            message: 'role can not be empty'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'email can not be empty'
                        },
                        emailAddress: {
                            message: 'mail wrong format'
                        }
                    }
                },
                contact_1_email: {
                    validators: {
                        notEmpty: {
                            message: 'email can not be empty'
                        },
                        	regexp: {
	                        regexp: /^[A-Za-z0-9\u4e00-\u9fa5_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	                        message: 'contact_1_email wrong format'
                    	}
                    }
                },
                contact_2_email: {
                    validators: {
                        notEmpty: {
                            message: 'email can not be empty'
                        },
                        	regexp: {
	                        regexp: /^[A-Za-z0-9\u4e00-\u9fa5_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	                        message: 'contact_1_email wrong format'
                    	}
                    }
                },
                phoneNumber: {
                    validators: {
                    	notEmpty: {
                            message: 'phone can not be empty'
                        },
                        phone: {
                            country: 'countrySelectBox',
                            message: 'phone wrong format'
                        }
                    }
                },
                dealer_add_name: {
                    validators: {
                        notEmpty: {
                            message: 'dealership cannot be empty'
                        }
                    }
                },
                /*dealer_add_startPromotion: {
                    validators: {
                        notEmpty: {
                            message: 'Promotion starts from can not be empty'
                        },
                    	regexp: {
	                        regexp: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
	                        message: 'Promotion starts from wrong format'
                    	}
                    }
                },
                dealer_add_endPromotion: {
                    validators: {
                        notEmpty: {
                            message: 'Promotion ends by can not be empty'
                        },
                    	regexp: {
	                        regexp: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
	                        message: 'Promotion ends by wrong format'
                    	}
                    }
                },
                
                dealer_edit_startPromotion: {
                    validators: {
                        notEmpty: {
                            message: 'Promotion starts from can not be empty'
                        },
                    	regexp: {
	                        regexp: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
	                        message: 'Promotion starts from wrong format'
                    	}
                    }
                },
                dealer_edit_endPromotion: {
                    validators: {
                        notEmpty: {
                            message: 'Promotion ends by can not be empty'
                        },
                    	regexp: {
	                        regexp: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
	                        message: 'Promotion ends by wrong format'
                    	}
                    }
                },*/
                name: {
                    message: 'name wrong format',
                    validators: {
                        notEmpty: {
                            message: 'name can not be empty'
                        },
                        stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: 'name must be more than 6 characters, less than 30 characters'
                    	},
                    	regexp: {
	                        regexp: /^[a-zA-Z0-9_]+$/,
	                        message: 'name can only be lowercase letters, uppercase letters, numbers'
                    	}
                    }
                },
                tel: {
                    validators: {
                        notEmpty: {
                            message: 'tel can not be empty'
                        }
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: 'price  can not be empty'
                        }/*,
                    	regexp: {
	                        regexp: /^[0-9_]+$/,
	                        message: 'price only numbers'
                    	}*/
                    }
                },
                website: {
                    validators: {
                        notEmpty: {
                            message: 'website  can not be empty'
                        },
                        regexp: {
	                        regexp: /[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
	                        message: 'website wrong format'
                    	}
                    }
                },
                address: {
                    validators: {
                        notEmpty: {
                            message: 'address can not be empty'
                        }
                    }
                },
                business: {
                    validators: {
                        notEmpty: {
                            message: 'businessTime  can not be empty'
                        }
                    }
                },
                contact_1_Name: {
                    validators: {
                        notEmpty: {
                            message: 'contact user  can not be empty'
                        }
                    }
                },
                contact_1_Tel: {
                    validators: {
                        notEmpty: {
                            message: 'contact tel  can not be empty'
                        }
                    }
                },
                contact_2_Name: {
                    validators: {
                        notEmpty: {
                            message: 'contact user  can not be empty'
                        }
                    }
                },
                contact_2_Tel: {
                    validators: {
                        notEmpty: {
                            message: 'contact tel  can not be empty'
                        }
                    }
                },
                postcode: {
                    validators: {
                        notEmpty: {
                            message: 'postcode can not be empty'
                        }
                    }
                },
                dealerName: {
                    validators: {
                        notEmpty: {
                            message: 'dealership can not be empty'
                        },
                        stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: 'dealership must be more than 6 characters, less than 30 characters'
                    	},
                    	regexp: {
	                        regexp: /[\w\+]/,
	                        message: 'dealership can only be lowercase letters, uppercase letters, numbers'
                    	}
                    }
                },
                sizeWith: {
                    validators: {
                        notEmpty: {
                            message: 'width  can not be empty'
                        },
                        between : {
                        	min : 1,
                        	max : 999,
                        	message: 'width value can only be within 1 and 999'
                        }
                    }
                },
                sizeHeight: {
                    validators: {
                        notEmpty: {
                            message: 'height can not be empty'
                        },
                        between : {
                        	min : 1,
                        	max : 999,
                        	message: 'height value can only be within 1 and 999'
                        }
                    }
                },
                ad_nums: {
                    validators: {
                        notEmpty: {
                            message: 'ad number can not be empty'
                        },
                        between : {
                        	min : 1,
                        	max : 99,
                        	message: 'ad number value can only be within 1 and 999'
                        }
                    }
                },
                band_name_add: {
                	validators: {
                        notEmpty: {
                            message: 'brand  can not be empty'
                        },
                    	}
                },
                band_name: {
                	validators: {
                        notEmpty: {
                            message: 'brand can not be empty'
                        },
                       /* stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: '必须要超过6个字符小于30个字符'
                    	},
                    	regexp: {
	                        regexp: /^[a-zA-Z_]+$/,
	                        message: '只能是 小写字母 , 大写字母'
                    	}*/
                    }
                },
                level_name: {
                	validators: {
                        notEmpty: {
                            message: 'level  can not be empty'
                        },
                       /* stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: '必须要超过6个字符小于30个字符'
                    	},
                    	regexp: {
	                        regexp: /^[a-zA-Z_]+$/,
	                        message: '只能是 小写字母 , 大写字母'
                    	}*/
                    }
                },
                model: {
                	validators: {
                        notEmpty: {
                            message: 'model  can not be empty'
                        }
                    }
                },
                series_name: {
                	validators: {
                        notEmpty: {
                            message: 'series  can not be empty'
                        },
                        /*stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: '必须要超过6个字符小于30个字符'
                    	},
                    	regexp: {
	                        regexp: /^[a-z\s*A-Z_]+$/,
	                        message: '只能是 小写字母 , 大写字母'
                    	}*/
                    }
                },
                series_model: {
                	validators: {
                        notEmpty: {
                            message: 'model can not be empty'
                        }
                    }
                },
                series_model_update: {
                	validators: {
                        notEmpty: {
                            message: 'model not modified'
                        }
                    }
                },
                brand_update: {
                	validators: {
                        notEmpty: {
                            message: 'brand not modified'
                        }
                    }
                },
                dealer_add_List: {
                	validators: {
                        notEmpty: {
                            message: 'dealer can not be empty'
                        }
                    }
                },
                carofweek_add_brandId: {
                	validators: {
                        notEmpty: {
                            message: 'brand can not be empty'
                        }
                    }
                },
                model_add_List: {
                	validators: {
                        notEmpty: {
                            message: 'model can not be empty'
                        }
                    }
                },
                series_add_List: {
                	validators: {
                        notEmpty: {
                            message: 'series can not be empty'
                        }
                    }
                },
                carofween_modelImage_url: {
                	validators: {
                        notEmpty: {
                            message: 'modelImage no upload'
                        }
                    }
                },
                carofweek_add_information: {
                	validators: {
                        notEmpty: {
                            message: 'information can not be empty'
                        }
                    }
                },
                carofweek_add_price: {
                	validators: {
                        notEmpty: {
                            message: 'price can not be empty'
                        }
                    }
                },model_edit_List: {
                	validators: {
                        notEmpty: {
                            message: 'model can not be empty'
                        }
                    }
                },
                series_edit_List: {
                	validators: {
                        notEmpty: {
                            message: 'series can not be empty'
                        }
                    }
                },
                carofweek_edit_information: {
                	validators: {
                        notEmpty: {
                            message: 'information can not be empty'
                        }
                    }
                },
                carofweek_edit_price: {
                	validators: {
                        notEmpty: {
                            message: 'price can not be empty'
                        }
                    }
                }
                
                
            }
        });
	})()
}
