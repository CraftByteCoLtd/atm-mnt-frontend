import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class LoggerService {
	log(error) {
		console.log("Logger", error);
	}

}

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
	router:Router;
	constructor(
		private injector: Injector	) {
		super(true);
	}

	handleError(error) {
		const loggingService = this.injector.get(LoggerService);
		this.router = this.injector.get(Router);
		console.log("Error");
		//uncomment below to see the fully error detail
	    this.customHandleError(error);
		loggingService.log(error);

		// Important : rethrow the error otherwise it gets swallowed
		throw error;
		// super.handleError(error);


	}

	customHandleError(error) {
		let errName = error.name;
		let customErr:any;

		switch (errName) {
			case "HttpErrorResponse":
				customErr = this.msgFactory(
					"Server is unavailable",
					"The requested server is unavailable. Please contact your support and describe your issue.")
				
			default:
              this.router.navigate(['/page-error']);

		}
	}

	msgFactory(title, msg){
		
		return  {"title": title ,"msg": title};
	} 
}