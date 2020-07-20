import * as Helper from "../../helper/page.title"


export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					alignment: 'left',
					page: '/admin/dashboard',
					
				},
				{
					title: 'Master',
					root: true,
					alignment: 'left',
					toggle: 'click',
					
					submenu: [
						
					]
				},
			
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/admin/dashboard',
					bullet: 'dot',
				},
				{
					title: 'Master',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-layer',
					submenu: [
						{
							title: 'Provider Management',
							bullet: 'dot',
							page: '/admin/provider',
						},
						{
							title: 'Buyer Management',
							bullet: 'dot',
							page: '/admin/buyer',
						}
					]
				},
				{
					title: 'Content',
					root: true,
					bullet: 'dot',
					icon: 'la la-support',
					submenu: [
						{
							title: 'CMS Management',
							bullet: 'dot',
							page: '/admin/cms-management'		
						},
						{
							title: 'Contact Management',
							bullet: 'dot',
							page: '/admin/contact-us-management'
						}
					]
				},				
				
				{
					title: 'Site User',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Admin Management',
							bullet: 'dot',
							page: '/admin/admin-management',
						}
					]
				},
				
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
