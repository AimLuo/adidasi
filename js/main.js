angular.module('myApp', [])
	.service('nav', ['$http', '$rootScope', function($http, $rootScope) {
		return {
			navs: function() {
				$http
					.get('json/nav.json')
					.then(function(data) {
						$rootScope.$broadcast('navinfo', data.data)
					}, function(error) {
						console.log('错误')
					})
			},
			futrue: function() {
				$http
					.get('json/future.json')
					.then(function(data) {
						$rootScope.$broadcast('futrueinfo', data.data)
					}, function(error) {
						console.log('错误')
					})
			},
			product: function() {
				$http
					.get('json/tabNav.json')
					.then(function(data) {
						$rootScope.$broadcast('productinfo', data.data)
					}, function(error) {
						console.log('错误')
					})
			}

		}
	}])
	.controller('myC', ['$scope', 'nav', function($scope, nav) {
		nav.navs()
		$scope.$on('navinfo', function(event, data) {
			$scope.items = data
		})
		nav.futrue()
		$scope.$on('futrueinfo', function(event, data) {
			$scope.futrulists = data
		});
		nav.product()
		$scope.$on('productinfo', function(event, data) {
			$scope.productlists = data
		})

		window.onload = function() {
			$(function() {
				//头部动画
				var $header = $('header'),
					$menu = $('.menu'),
					$searchbtn = $('.searchbtn'),
					$searchinput = $('.searchinput'),
					$nav = $('.nav'),
					$navdt = $('.nav dt'),
					$navp = $('.nav dt p'),
					$navul = $('.nav dt ul'),
					onoff1 = true,
					onoff2 = true,
					onoff3 = true;
				//头部菜单高度
				// $nav.height($(window).height())
				//菜单
				$menu.click(function(ev) {
					ev.stopPropagation();
					if (!onoff2) {
						$searchinput.hide()
					}
					if (onoff1) {
						onoff1 = false;
						$header.addClass('H-active');
						$('.banner').addClass('bannerAC')
						$('body').addClass('bodyAC')
						var $bodyAC = $('body')
						bodyAC($bodyAC)
					} else {
						onoff1 = true;
						$header.removeClass('H-active');
						$('.banner').removeClass('bannerAC')
						$('body').removeClass('bodyAC')
						$navul.slideUp(600)
						onoff3 = true
						$('body').off()
					}
				})

				function bodyAC(obj) {
					obj.click(function() {
						onoff1 = true;
						$header.removeClass('H-active');
						$('.banner').removeClass('bannerAC')
						$('body').removeClass('bodyAC')
						$navul.slideUp(600)
						onoff3 = true
						$('body').off()
					})
				}
				//搜索框
				$searchbtn.click(function() {
						if (onoff2) {
							onoff2 = false;
							$searchinput.slideDown(300)
							$searchbtn.css('background', '#363738')
						} else {
							onoff2 = true;
							$searchinput.slideUp(300)
							$searchbtn.css('background', '#000000')
						}
					})
					//c菜单展开
				var pindex = null;
				$navdt.click(function(ev) {
					ev.stopPropagation();
				})
				$navdt.find('p').click(function(ev) {
						ev.stopPropagation();
						if ($(this).parent().index() != pindex) {
							onoff3 = true
						}
						if (onoff3) {
							onoff3 = false;
							pindex = $(this).parent().index()
							$navp.next().stop().slideUp()
							$(this).next().stop().slideDown()
						} else {
							onoff3 = true;
							$(this).next().stop().slideUp()
						}
					})
					//切换男鞋和女鞋
				var $tabsexli = $('.tabNav li'),
					$male = $('.male'),
					$female = $('.female');
				$tabsexli.click(function() {
						if ($(this).index() == 0) {
							$tabsexli.removeClass()
							$(this).addClass('tabNavliAC')
							$female.hide();
							$male.show();

						}
						if ($(this).index() == 1) {
							$tabsexli.removeClass()
							$(this).addClass('tabNavliAC')
							$male.hide();
							$female.show();
							var swiper3 = new Swiper('.female', {
								slidesPerView: 2,
								nextButton: '.sbn3',
								prevButton: '.sbp3',
								autoplayDisableOnInteraction: false
							});
						}
					})
					//轮播
				var swiper1 = new Swiper('.banner', {
					autoplay: 3000,
					pagination: '.sp1',
					slidesPerView: 1,
					paginationClickable: true,
					loop: true,
					autoplayDisableOnInteraction: false
				});
				var swiper2 = new Swiper('.male', {
					slidesPerView: 2,
					nextButton: '.sbn2',
					prevButton: '.sbp2',
					autoplayDisableOnInteraction: false
				});
			})

		}

	}])