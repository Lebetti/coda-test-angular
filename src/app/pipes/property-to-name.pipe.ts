import { CommonModule } from "@angular/common";
import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'PropertyToName' })

export class PropertyToName implements PipeTransform {

	transform(value: string, ...args: any[]) {
		switch (value) {
			case 'firstname': {
				return 'Nombre';
			}
			case 'lastname': {
				return 'Apellido';
			}
			case 'email': {
				return 'Email';
			}
			default: {
				throw new Error("Method not implemented.");
			}
		}

	}

}

@NgModule({
	declarations: [PropertyToName],
	imports: [CommonModule],
	exports: [PropertyToName],
	providers: [PropertyToName]
})

export class PropertyToNameModule { }