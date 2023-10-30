import { Component } from '@angular/core';
import { parse } from 'node-html-parser';
import { NgForm } from '@angular/forms'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataMap = new Map<string, string>();
  address = "";
  input = "";
  

  onSubmit(f: NgForm) {
    const input: string = f.value.HTMLInput;

    const root = parse(input);

    // get org name
    var orgName = "";
    const tables = root.querySelectorAll('tr');
    tables.forEach((e) => {
      const org = e.querySelector('td[style="width: 25%;"]')?.querySelector('strong');
      if (org?.innerText.trim() == "Organization:") {
        orgName = e.querySelector('td[width="75%"]')?.innerText || "";
      }
    })

    this.dataMap.set("orgName", orgName);
    this.dataMap.set("addressTo", root.querySelector('.np-view-question--37')?.innerHTML.trim() || "");
    this.dataMap.set("addrLine1", root.querySelector('.np-view-question--11')?.innerHTML.trim() || "");
    this.dataMap.set("addrLine2", root.querySelector('.np-view-question--12')?.innerHTML.trim() || "");
    this.dataMap.set("city", root.querySelector('.np-view-question--13')?.innerHTML.trim() || "");
    this.dataMap.set("zipcode", root.querySelector('.np-view-question--14')?.innerHTML.trim() || "");
    this.dataMap.set("province", root.querySelector('.np-view-question--15')?.innerHTML.trim() || "");
    this.dataMap.set("country", root.querySelector('.np-view-question--16')?.innerHTML.trim() || "");

    console.log(this.dataMap);
    
    const addressElems = [this.dataMap.get("addrLine1"), this.dataMap.get("addrLine2"), this.dataMap.get("city"), this.dataMap.get("zipcode"), this.dataMap.get("province"), this.dataMap.get("country")]

    addressElems.forEach((e) => {
        if (e != "") {
        this.address += e + ", ";
        }
    })
    this.address = this.address.slice(0, -2);
  }

  clearData(): void {
    this.dataMap.clear();
    this.address = "";
    this.input = "";
  }
}
