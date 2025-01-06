<template>
  <!--整个页面的大容器-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">
    <!--导航栏-->
    <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246); margin-left: -9px">
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/User/RabiesOverview"
          style="height: 100%"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>

        <!--管理员Home导航栏-->
        <el-menu-item index="/User/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Home</span>
        </el-menu-item>

        <!--RABV Overview导航栏-->
        <el-menu-item index="/User/RabiesOverview">
          <i class="el-icon-info"></i>
          <span slot="title" style="font-size: 16px">RABV Overview</span>
        </el-menu-item>

        <!--Sequence Search导航栏-->
        <el-menu-item index="/User/SequenceSearch">
          <i class="el-icon-search"></i>
          <span slot="title" style="font-size: 16px">Sequence Search</span>
        </el-menu-item>

        <!--Sequence Submit导航栏-->
        <el-menu-item index="/User/SequenceSubmit">
          <i class="el-icon-upload"></i>
          <span slot="title" style="font-size: 16px">Sequence Submit</span>
        </el-menu-item>

        <!--Notifications导航栏-->
        <el-menu-item index="/User/Notifications">
          <i class="el-icon-bell"></i>
          <span slot="title" style="font-size: 16px">Notifications</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 100%">

      <!--Header部分-->
      <el-header style="text-align: right; font-size: 12px; border-bottom: darkgray 3px solid">
        <div style="display: flex;line-height: 60px">

          <!--侧边栏的伸缩按钮以及实现-->
          <div >
            <i :class="collapseIcon" style="font-size: 25px; cursor: pointer" @click="collapse"></i>
          </div>

          <!--页面正上方的介绍字体-->
          <div style="flex:1; text-align: center; font-size: 32px">
            <span style="font-weight: bold;font-family: 'Calibri';">RABV Genome DataBase</span>
          </div>

          <!--页面右上角的下拉菜单-->
          <el-dropdown>
            <i class="el-icon-user-solid" style="font-size: 25px"></i>
            <span>{{user.username}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toInfoSetting">Info Setting</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">Quit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!--RABV的简介部分-->
      <div style="padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; margin: 20px;">
        <h2>Rabies Virus (RABV)</h2>
        <p class="paragraph-style">
          Rabies virus, scientific name <em>Rabies lyssavirus</em>, is a neurotropic virus that causes rabies in animals, including humans.
          It can cause violence, hydrophobia, and fever. Rabies transmission can also occur through the saliva of animals and less commonly through contact with human saliva.
          <em>Rabies lyssavirus</em>, like many rhabdoviruses, has an extremely wide host range. In the wild it has been found infecting many mammalian species, while in the laboratory it has been found that birds can be infected, as well as cell cultures from mammals, birds, reptiles, and insects.
        </p>
        <p class="paragraph-style">
          Rabies is reported in more than 150 countries and on all continents except Antarctica. The main burden of disease is reported in Asia and Africa, but some cases have been reported also in Europe in the past 10 years, especially in returning travellers.
        </p>
        <div style="text-align: center; margin-top: 40px;">
          <img
              src="../../assets/images/RABV-structure.png"
              alt="RABV Structure"
              style="width: 40%; height: auto; border-radius: 8px;"
          />
        </div>
        <h2>Structure of RABV</h2>
        <p class="paragraph-style">
          Rhabdoviruses have helical symmetry, so their infectious particles are approximately cylindrical in shape. They are characterized by an extremely broad host spectrum ranging from plants to insects and mammals.  human-infecting viruses more commonly have icosahedral symmetry and take shapes approximating regular polyhedra.
        </p>
        <p class="paragraph-style">
          The rabies genome encodes five proteins: nucleoprotein (N), phosphoprotein (P), matrix protein (M), glycoprotein (G) and polymerase (L). All rhabdoviruses have two major structural components: a helical ribonucleoprotein core (RNP) and a surrounding envelope. In the RNP, genomic RNA is tightly encased by the nucleoprotein. Two other viral proteins, the phosphoprotein and the large protein (L-protein or polymerase) are associated with the RNP. The glycoprotein forms approximately 400 trimeric spikes which are tightly arranged on the surface of the virus. The M protein is associated both with the envelope and the RNP and may be the central protein of rhabdovirus assembly.
        </p>
        <p class="paragraph-style">
          Rabies lyssavirus has a bullet-like shape with a length of about 180 nm and a cross-sectional diameter of about 75 nm. One end is rounded or conical and the other end is planar or concave. The lipoprotein envelope carries knob-like spikes composed of Glycoprotein G. Spikes do not cover the planar end of the virion (virus particle). Beneath the envelope is the membrane or matrix (M) protein layer which may be invaginated at the planar end. The core of the virion consists of helically arranged ribonucleoprotein.
        </p>
        <div style="text-align: center; margin-top: 40px;">
          <img
              src="../../assets/images/RABV-genome.png"
              alt="RABV-genome"
              style="width: 70%; height: auto; border-radius: 8px;"
          />
        </div>
        <h2>Life Cycle of RABV</h2>
        <p class="paragraph-style">
          After receptor binding, Rabies lyssavirus enters its host cells through the endosomal transport pathway. Inside the endosome, the low pH value induces the membrane fusion process, thus enabling the viral genome to reach the cytosol. Both processes, receptor binding and membrane fusion, are catalyzed by the glycoprotein G which plays a critical role in pathogenesis (mutant virus without G proteins cannot propagate).
        </p>
        <p class="paragraph-style">
          The next step after its entry is the transcription of the viral genome by the P-L polymerase (P is an essential cofactor for the L polymerase) in order to make new viral protein. The viral polymerase can only recognize ribonucleoprotein and cannot use free RNA as template. Transcription is regulated by cis-acting sequences on the virus genome and by protein M which is not only essential for virus budding but also regulates the fraction of mRNA production to replication. Later in infection, the activity of the polymerase switches to replication in order to produce full-length positive-strand RNA copies. These complementary RNAs are used as templates to make new negative-strand RNA genomes. They are packaged together with protein N to form ribonucleoprotein which then can form new viruses.
        </p>
        <div style="text-align: center; margin-top: 40px;">
          <img
              src="../../assets/images/RABV-map.png"
              alt="RABV-map"
              style="width: 70%; height: auto; border-radius: 8px;"
          />
        </div>
      </div>

    </el-container>
  </el-container>

</template>

<script>


export default {
  name: "UserRabiesOverviewComponent",
  data(){
    return{
      aside_width: '220px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold',
    }
  },
  methods:{
    // 导航栏实现伸缩功能的方法
    collapse(){
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse){
        this.aside_width = '64px';
        this.collapseIcon = 'el-icon-s-unfold';
      }
      else{
        this.aside_width = '220px';
        this.collapseIcon = 'el-icon-s-fold';
      }
    },
    toInfoSetting(){
      this.$router.push("/User/InfoSetting");
    },
    // 跳转到登录页的方法
    logOut(){
      this.$confirm('Sure to quit?', '', {
        confirmButtonText: 'Quit',  //确认按钮的文字显示
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true, //文字居中显示
      })
          .then(() => {
            this.$message({
              type:'success',
              message:'Quit successfully'
            })
            // 清除 sessionStorage 中的用户信息
            sessionStorage.removeItem("userInfo"); //  当用户退出时, 清除sessionStorage
            this.$router.push("/"); // 返回登录页面
          })
          .catch(() => {
            this.$message({
              type:'info',
              message:'Cancelled'
            })
          })
    },
    // 加载页面时, 将会话存储中的userInfo加载到user中
    init(){
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  created(){
    this.init()
  }
}
</script>

<style  scoped>
.el-descriptions {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.header-style {
  font-size: 36px; /* 字体大小，略小于之前 */
  font-weight: 600; /* 半加粗，显得稳重 */
  color: #333; /* 深灰色字体，正式风格 */
  text-transform: capitalize; /* 首字母大写，显得更规范 */
  letter-spacing: 1px; /* 适当的字间距 */
  padding-bottom: 10px; /* 增加底部空间 */
  margin-bottom: 20px; /* 增加外边距，与其他元素区分 */
  font-family: "Times New Roman", Times, serif; /* 正式的字体 */
}

.paragraph-style{
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}

</style>