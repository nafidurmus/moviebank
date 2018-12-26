import React, { Component } from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';

export default class Conditions extends Component {

    render() {
        document.title = "Conditions Of Usage";
        return (
            <div>
                <NavigationBar />
                <div style={styles.bodyStyle}>
                    <h3 style={{textAlign: "center"}}><b>MovieBank Conditions of Use</b></h3>
    
    Welcome to MovieBank. MovieBank.herokuapp.com, Inc. and/or its affiliates ("MovieBank") provide its website features and other services to you subject to the following conditions. If you visit MovieBank.herokuapp.com, use other MovieBank services, products, or use software or mobile applications provided by MovieBank that states that it is subject to these Conditions of Use (collectively “MovieBank Services”), you accept these conditions. Please read them carefully. In addition, when you use any current, future MovieBank Services, (e.g., MovieBankPro.com) you also will be subject to the guidelines, terms and agreements (“Terms”) applicable to that MovieBank Service. If these Conditions of Use are inconsistent with the Terms provided for any MovieBank service, the Terms will control.
    <br />
    <b style={styles.midTitleStyle}>Privacy</b><br/>
    Please review our Privacy Notice, which also governs your use of any MovieBank Service, to understand our practices.
    <br/>
    <b style={styles.midTitleStyle}>Electronic Communications</b><br/>
    When you use any MovieBank Service or send e-mails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices on this site or through the other MovieBank Services. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
    <br/>
    <b style={styles.midTitleStyle}>Copyright</b><br/>
    All content included on this site in or made available through any MovieBank Service, such as text, graphics, logos, button icons, images, audio clips, video clips, digital downloads, data compilations, and software, is the property of MovieBank or its content suppliers and protected by Turkey and international copyright laws. The compilation of all content included in or made available through any MovieBank Service is the exclusive property of MovieBank and protected by Turkey. and international copyright laws. All software used in any MovieBank Service is the property of MovieBank or its software suppliers and protected by Turkey and international copyright laws.
    <br/>
    <b style={styles.midTitleStyle}>Trademarks</b><br/>
    MovieBank and STARMETER are registered trademarks, and the MovieBank logo, MovieBankPRO, MOVIEMETER, and other marks indicated in any MovieBank Services are trademarks of MovieBank in the Turkey and/or other countries. Other MovieBank graphics, logos, page headers, button icons, scripts, and service names are trademarks or trade dress of MovieBank. MovieBank's trademarks and trade dress may not be used in connection with any product or service that is not MovieBank's, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits MovieBank. All other trademarks not owned by MovieBank that appear on this site or in any MovieBank Service are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by MovieBank.
    <br/>
    <b style={styles.midTitleStyle}>License and Site Access</b><br/>
    Subject to your compliance with these Conditions of Use and your payment of any applicable fees, MovieBank or its content providers grants you a limited, non-exclusive, non-transferable, non-sublicenseable license to access and make personal and non-commercial use of the MovieBank Services, including digital content available through the MovieBank Services, and not to download (other than page caching) or modify this site, or any portion of it, except with express written consent of MovieBank. Additional license terms may be found in the Terms. The MovieBank Services or any portion of such services may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of MovieBank. This license does not include any resale or commercial use of any MovieBank Service or its contents or any derivative use of this site or its contents. All licenses are non-exclusive and all rights not expressly granted to you in these Conditions of Use or any applicable Terms are reserved and retained by MovieBank or its licensors, suppliers, publishers, rightsholders, or other content providers. You will use all MovieBank Services in compliance with all applicable laws.
    <br/>
    <b>Robots and Screen Scraping:</b> You may not use data mining, robots, screen scraping, or similar data gathering and extraction tools on this site, except with our express written consent as noted below.
    <br/>
    <b>Framing:</b> You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of MovieBank without express written consent.
    <br/>
    <b>Meta Tags:</b> You may not use any meta tags or any other "hidden text" utilizing MovieBank's name or trademarks without the express written consent of MovieBank. Any unauthorized use terminates the permission or license granted by MovieBank.
    <br/>
    <b>Licensing MovieBank Content; Consent to Use Robots and Crawlers:</b> If you are interested in receiving our express written permission to use MovieBank content for your non-personal (including commercial) use, please visit our Content Licensing section or contact our Licensing Department. We do allow the limited use of robots and crawlers, such as those from certain search engines, with our express written consent. If you are interested in receiving our express written permission to use robots or crawlers on our site, please contact our Licensing Department.
    <br/>
    <b>Linking to MovieBank.herokuapp.com:</b> You are granted a limited, revocable, and nonexclusive right to create a hyperlink to MovieBank.herokuapp.com so long as the link follows our linking guide and does not portray MovieBank, its services in a false, misleading, derogatory, or otherwise offensive matter. You may not use any MovieBank logo or other proprietary graphic or trademark as part of the link without express written permission except as outlined in our help section.
    <br/>
    <b style={styles.midTitleStyle}>Your Account</b><br/>
    If you use any MovieBank Service, you are responsible for maintaining the confidentiality of log-in information and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. MovieBank reserves the right to refuse service, terminate accounts, or remove or edit content in its sole discretion.
    Reviews, Comments, Communications, and Other Content
    Visitors may post reviews, comments, and other content; and submit suggestions, ideas, comments, questions, or other information, so long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties or objectionable and does not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings, or any form of "spam." You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of your content. MovieBank reserves the right (but not the obligation) to remove or edit such content, but does not regularly review posted content.
    <br/><b>Your License to MovieBank:</b> If you do post content or submit material, and unless we indicate otherwise, you grant MovieBank a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media. You grant MovieBank and its sublicensees the right to use the name that you submit in connection with such content, if they choose. You represent and warrant that you own or otherwise control all of the rights to the content that you post; that the content is accurate; that use of the content you supply does not violate this policy and will not cause injury to any person or entity; and that you will indemnify MovieBank for all claims resulting from content you supply. MovieBank has the right but not the obligation to monitor and edit or remove any activity or content. MovieBank takes no responsibility and assumes no liability for any content posted by you or any third party. If you would like to learn more about how we handle content that you submit, please review our Privacy Notice.
    <br/>
    <b style={styles.midTitleStyle}>Copyright Complaints</b><br/>
    MovieBank respects the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide MovieBank's copyright agent the written information specified below. Please note that this procedure is exclusively for notifying MovieBank and its affiliates that your copyrighted material has been infringed.
    <br/>
    <ul type="disc">
    <li/>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;
    <li/>A description of the copyrighted work that you claim has been infringed upon;
    <li/>A description of where the material that you claim is infringing is located on the site;
    Your address, telephone number, and e-mail address;
    <li/>A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;
    <li/>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.
    </ul>MovieBank's Copyright Agent for notice of copyright infringement on it site can be reached as follows:
    <br/>
    &nbsp;&nbsp;MovieBank Copyright Agent<br/>
    &nbsp;&nbsp;Çünür Mahallesi, Süleyman Demirel Cd., 32260 Merkez/Isparta
<br/>
    email: sefaemrahoglu@gmail.com  /  nafidurmus@gmail.com  /  erimtuzcuoglu@gmail.com
    <br/>In appropriate circumstances, MovieBank will terminate the accounts of account holders who are repeat infringers.
    <br/>
    <br/><b style={styles.midTitleStyle}>Disclaimer of Warranties and Limitation of Liability</b>
    <br/>THE MovieBank SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE MovieBank SERVICES ARE PROVIDED BY MovieBank ON AN "AS IS" AND "AS AVAILABLE" BASIS. MovieBank MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE MovieBank SERVICES OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE MovieBank SERVICES. YOU EXPRESSLY AGREE THAT YOUR USE OF THE MovieBank SERVICES IS AT YOUR SOLE RISK. MovieBank RESERVES THE RIGHT TO WITHDRAW ANY MovieBank SERVICE OR DELETE ANY INFORMATION FROM THE MovieBank SERVICES AT ANY TIME IN ITS DISCRETION.
    
    <br/>TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, MovieBank DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. MovieBank DOES NOT WARRANT THAT THE MovieBank SERVICES, INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE MovieBank SERVICES, ITS SERVERS, OR ELECTRONIC COMMUNICATIONS SENT FROM MovieBank ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. MovieBank WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF ANY MovieBank SERVICE, OR FROM ANY INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH ANY MovieBank SERVICE, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES.
    
    <br/>CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
    
    <br/><b>MovieBank Software Terms</b> In addition to these Conditions of Use, the terms found here apply to any software (including any updates or upgrades to the software and any related documentation) that we make available to you from time to time for your use in connection with MovieBank Services (“MovieBank Software”). If we provide specific Terms for the MovieBank Software and there is a conflict between the specific Terms for the MovieBank Software and these Conditions of Use, the specific Terms for the MovieBank Software will govern.
    
    <br/><b style={styles.midTitleStyle}>Applicable Law</b>
    <br/>By using any MovieBank Service, you agree that the laws of the state of Washington, without regard to principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort that might arise between you and MovieBank.
    
    <br/><b style={styles.midTitleStyle}>Disputes</b>
    <br/>Any dispute or claim relating in any way to your use of any MovieBank Service, or any products or services sold or distributed by MovieBank or through the MovieBank Services will be resolved by binding arbitration, rather than in court, except that you may assert claims in small claims court if your claims qualify. The Federal Arbitration Act and federal arbitration law apply to this agreement.
    
    <br/><b>a.</b> There is no judge or jury in arbitration, and court review of an arbitration award is limited. However, an arbitrator can award on an individual basis the same damages and relief as a court (including injunctive and declaratory relief or statutory damages), and must follow the terms of these Conditions of Use as a court would.
    <br/><b>b.</b> To begin an arbitration proceeding, you must send a letter requesting arbitration and describing your claim to our registered agent Corporation Service Company, Isparta. The arbitration will be conducted by the American Arbitration Association (AAA) under its rules, including the AAA’s Supplementary Procedures for Consumer-Related Disputes. The AAA’s rules are available at www.adr.org or by calling 1-800-778-7879. Payment of all filing, administration and arbitrator fees will be governed by the AAA’s rules. We will reimburse those fees for claims totaling less than $10,000 unless the arbitrator determines the claims are frivolous. Likewise, MovieBank will not seek attorneys’ fees and costs in arbitration unless the arbitrator determines the claims are frivolous. You may choose to have the arbitration conducted by telephone, based on written submissions, or in person in the county where you live or at another mutually agreed location.
    <br/><b>c.</b> You and MovieBank each agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated or representative action. If for any reason a claim proceeds in court rather than in arbitration you and MovieBank each waive any right to a jury trial. You and MovieBank also both agree that you or we may bring suit in court to enjoin infringement or other misuse of intellectual property rights.
    <br/><b style={styles.midTitleStyle}>Site Policies, Modification, and Severability</b>
    <br/> Please review our other policies. These policies also govern your use of MovieBank Services. We reserve the right to make changes to our site, policies, and these our site, policies, Terms, and these Conditions of Use at any time. If any of these conditions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severable and shall not affect the validity and enforceability of any remaining condition.
    
    <br/>&nbsp;&nbsp;<b style={styles.midTitleStyle}>Our Address</b>
    <br/>&nbsp;&nbsp;MovieBank.herokuapp.com, Inc.
    <br/>&nbsp;&nbsp;Çünür Mahallesi, Süleyman Demirel Cd., 32260 Merkez/Isparta
    <br/>&nbsp;&nbsp;http://www.MovieBank.herokuapp.com/
    
    
    
    <br/>Additional MovieBank Software Terms
    <ol type="a">
    <li><b>Use of the MovieBank Software.</b> You may use the MovieBank Software only in connection with the MovieBank Services. You may not separate any individual component of the MovieBank Software for use other than in connection with the MovieBank Services, incorporate any portion of it into your own programs or compile any portion of it in combination with your own programs, transfer it for use with another service, use it, or any portion of it, over a network, or sell, rent, lease, lend, loan, distribute or sub-license the MovieBank Software or otherwise assign any rights to the MovieBank Software in whole or in part. You may not use the MovieBank Software for any illegal purpose. We may discontinue some or all of any MovieBank Software we provide, and we may terminate your right to use any MovieBank Software at any time and in such event may modify it to make it inoperable. Your rights to use the MovieBank Software will automatically terminate without notice from us if you fail to comply with any of these terms. Additional third party terms contained within or distributed with certain MovieBank Software that are specifically identified in related documentation may apply to that MovieBank Software and will govern the use of that MovieBank Software in the event of a conflict with these Conditions of Use.</li>
    <li><b>Use of Third Party Services.</b> When you use the MovieBank Software, you may also be using the services of one or more third parties, such as a wireless carrier or a mobile platform provider. Your use of these third party services may be subject to the separate policies, terms of use, and fees of these third parties.</li>
    <li><b>No Reverse Engineering.</b> You may not, and you will not encourage, assist or authorize any other person to modify, reverse engineer, decompile or disassemble, or otherwise tamper with, the MovieBank Software, whether in whole or in part, or create any derivative works from or of the MovieBank Software.</li>
    <li><b>Updates.</b> In order to keep the MovieBank Software up-to-date, we may offer automatic or manual updates at any time and without notice to you.</li>
    <li><b>Export Regulations; Government End Users.</b> You must comply with all export and re-export restrictions and regulations of the Department of Commerce and other Turkey agencies and authorities that may apply to the MovieBank Software. If you are a Turkey. Government end user, we are licensing the MovieBank Software to you as a "Commercial Item" as that term is defined in the Turkey. Code of Federal Regulations (see 48 C.F.R. § 2.101), and the rights we grant you to the MovieBank Software are the same as the rights we grant to all others under these Conditions of Use.</li>
    </ol>            
    </div>
                <Footer />
            </div>
        );
    }
}

const styles = {
    style: {
        width: '100%',
        marginTop: 10,
    },
    bodyStyle: {
        margin: 'auto',
        width: '95%',
        marginTop: '5%',
    },
    midTitleStyle: {
        color: '#26a02a',
        fontSize: 20
    }
}