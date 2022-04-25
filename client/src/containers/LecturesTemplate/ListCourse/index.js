import React, { Component } from 'react'
import '../../Assets/style.css'
import Course from './Course'
import Loader from '../../../components/Loader'
import { connect } from 'react-redux'
import { actionFetchListCourse } from './modules/action'

class ListCourse extends Component {
  // constructor(props){
  //   super(props)
  //   this.state={
  //     loading: false,
  //     // khi reload lại trang web thì hàm khởi tạo (constructor) sẽ chạy đầu tiên, mà lần đầu tiên nó chạy thì chắc chắn data sẽ không bao giờ có, nên data ở đây sẽ là null.
  //     // Sau khi hàm khởi tạo chạy xong rồi thì tới hàm render() chạy để render lại cái UI
  //     // render() chạy xong rồi thì tới tới componentDidMount() chạy, và lấy được cái resource data, thì lúc này mình sẽ cập nhật lại cái state qua hàm setState() trong .then()
  //     data: null,
  //     error:null
  //   }
  // }

  componentDidMount(){
    // life cycle chạy sau render
    // axios return trả về promise, còn ký thuật thì ta viết then catch
    // trước khi gọi axios, đây là khoảng thời gian pending

    //pending: là lúc ta gửi request lên server, thì nó sẽ trả về 1 trg 2 hành động là success và error => có 3 action (pending, success, error)
    // this.setState({
    //   loading: true,
    //   data: null,
    //   error: null
    // })
    // this.props.request();
    // axios({
    //   url: "/courses/",
    //   method: "GET"
    // })
    //   .then((result)=>{
    //     // success
    //     // this.setState({
    //     //   loading: false,
    //     //   data: result.data.data,
    //     //   error: null
    //     // })
    //     this.props.success(result.data.data);
    //   })
    //   .catch((error)=>{
    //     // error
    //     // bị lỗi thì chạy vô hàm catch, mình handle 1 cái callback function 
    //     // this.setState({
    //     //   loading: false,
    //     //   data: null,
    //     //   error
    //     // })
    //     this.props.error(error);      
    //   })
    this.props.fetchData()
  }

  renderListCourse = ()=>{
    // để duyệt mảng thì mình bóc tách lại data được gán trong state
    const { data, loading } = this.props

    if(loading){
      return <Loader />
    }

    return data?.map((course)=>{
      return <Course key={course.courseID} course={course}/>
    })
  }

  render() {
    return (
      <section className='wrapper'>
        <div className='container-fostrap'>      
          <div className='content'>
            <div className='container'>
              <div className='row'>
                {this.renderListCourse()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    loading: state.listCourseReducer.loading,
    data: state.listCourseReducer.data
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    fetchData: ()=>{
      dispatch(actionFetchListCourse())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListCourse);